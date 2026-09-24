/**
 * calendarSyncService.js
 * Generates a standards-compliant RFC 5545 .ics iCalendar file
 * for all fleet vehicle ZINARA and Insurance expiry dates,
 * with reminder alarms at 14 days and 3 days before each deadline.
 *
 * Also builds Google Calendar quick-add URLs as an alternative.
 */

/** Format a Date to iCal YYYYMMDD string */
function toICalDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

/** Format a Date to iCal YYYYMMDDTHHMMSSZ UTC string */
function toICalDateTime(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/** Generate a simple UID for each event */
function makeUID(prefix, reg, type) {
  return `${prefix}-${reg.replace(/[^A-Z0-9]/gi, '')}-${type}-nexalink@nexalink.co.zw`;
}

/**
 * Build a single VEVENT block for a fleet expiry reminder.
 *
 * @param {string} reg          - Vehicle registration e.g. AEG-4902
 * @param {string} model        - Vehicle model e.g. Toyota Fortuner
 * @param {Date}   expiryDate   - The actual expiry date
 * @param {string} licenseType  - 'ZINARA Road License' | 'Vehicle Insurance'
 */
function buildVEvent(reg, model, expiryDate, licenseType) {
  const now = new Date();
  const dtstamp = toICalDateTime(now);
  const dtstart = toICalDate(expiryDate);

  // 14-day reminder
  const alarm14Days = 14 * 24 * 60; // minutes before event
  // 3-day reminder
  const alarm3Days = 3 * 24 * 60;

  const uid14 = makeUID('14D', reg, licenseType.replace(/\s+/g, ''));
  const uid3 = makeUID('3D', reg, licenseType.replace(/\s+/g, ''));
  const uid = makeUID('EXP', reg, licenseType.replace(/\s+/g, ''));

  const summary = `⚠️ ${licenseType} Expires — ${reg}`;
  const description = `Nexalink Fleet Alert:\\n${licenseType} for ${model} (${reg}) expires on ${expiryDate.toDateString()}.\\n\\nContact Nexalink Harare to renew:\\n• WhatsApp/Mobile: +263 788 172 075\\n• Email: infoatnexalinksolutions@gmail.com\\n• Landline: 0882914627`;

  return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;VALUE=DATE:${dtstart}
DTEND;VALUE=DATE:${dtstart}
SUMMARY:${summary}
DESCRIPTION:${description}
STATUS:CONFIRMED
CATEGORIES:Fleet Compliance,Nexalink
BEGIN:VALARM
TRIGGER:-P14D
ACTION:DISPLAY
DESCRIPTION:14-Day Advance Notice: ${summary}
END:VALARM
BEGIN:VALARM
TRIGGER:-P3D
ACTION:DISPLAY
DESCRIPTION:3-Day Urgent Notice: ${summary}
END:VALARM
END:VEVENT`;
}

/**
 * Generate and trigger browser download of the .ics calendar file.
 * @param {Array} fleetVehicles - Array of vehicle objects from MOCK_CLIENT_DATA
 * @param {string} accountNumber - Client account number for the calendar title
 */
export function downloadCalendarICS(fleetVehicles, accountNumber = 'NX-884920') {
  const events = [];

  fleetVehicles.forEach((vehicle) => {
    // ZINARA expiry event
    const zinaraDate = new Date(vehicle.zinaraExpiry);
    if (!isNaN(zinaraDate)) {
      events.push(buildVEvent(vehicle.reg, vehicle.model, zinaraDate, 'ZINARA Road License'));
    }

    // Insurance expiry event (only if different date from ZINARA to avoid duplicate)
    const insuranceDate = new Date(vehicle.insuranceExpiry);
    if (!isNaN(insuranceDate) && vehicle.insuranceExpiry !== vehicle.zinaraExpiry) {
      events.push(buildVEvent(vehicle.reg, vehicle.model, insuranceDate, 'Vehicle Insurance'));
    } else if (!isNaN(insuranceDate) && vehicle.insuranceExpiry === vehicle.zinaraExpiry) {
      // Same date — bundle into one combined event
      const uid = makeUID('COMBO', vehicle.reg, 'ZINARAInsurance');
      const dtstart = toICalDate(zinaraDate);
      const dtstamp = toICalDateTime(new Date());
      const summary = `⚠️ ZINARA & Insurance Expire — ${vehicle.reg}`;
      const description = `Nexalink Fleet Alert:\\nBoth ZINARA Road License AND Vehicle Insurance for ${vehicle.model} (${vehicle.reg}) expire on ${zinaraDate.toDateString()}.\\n\\nRenew NOW via Nexalink:\\n• WhatsApp: +263 788 172 075\\n• Email: infoatnexalinksolutions@gmail.com`;
      events.push(`BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;VALUE=DATE:${dtstart}
DTEND;VALUE=DATE:${dtstart}
SUMMARY:${summary}
DESCRIPTION:${description}
STATUS:CONFIRMED
CATEGORIES:Fleet Compliance,Nexalink
BEGIN:VALARM
TRIGGER:-P14D
ACTION:DISPLAY
DESCRIPTION:14-Day Notice: ${summary}
END:VALARM
BEGIN:VALARM
TRIGGER:-P3D
ACTION:DISPLAY
DESCRIPTION:3-Day Urgent Notice: ${summary}
END:VALARM
END:VEVENT`);
    }
  });

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nexalink Solutions//Fleet Compliance Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Nexalink Fleet Expirations (${accountNumber})`,
    'X-WR-CALDESC:Automated vehicle license and insurance renewal reminders from Nexalink Solutions Harare.',
    'X-WR-TIMEZONE:Africa/Harare',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');

  // Trigger browser download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nexalink-fleet-expirations-${accountNumber}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { eventCount: events.length };
}

/**
 * Generate a Google Calendar add URL for a single vehicle's expiry.
 * Returns an array of URLs (one per event).
 * @param {Array} fleetVehicles
 */
export function getGoogleCalendarUrls(fleetVehicles) {
  const urls = [];

  fleetVehicles.forEach((vehicle) => {
    const zinaraDate = new Date(vehicle.zinaraExpiry);
    if (!isNaN(zinaraDate)) {
      const dateStr = toICalDate(zinaraDate);
      const title = encodeURIComponent(`⚠️ ZINARA & Insurance Expire — ${vehicle.reg}`);
      const details = encodeURIComponent(
        `Vehicle: ${vehicle.model} (${vehicle.reg})\nRenew via Nexalink: +263 788 172 075 | infoatnexalinksolutions@gmail.com`
      );
      urls.push({
        label: `${vehicle.reg} — ${vehicle.model}`,
        url: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}`
      });
    }
  });

  return urls;
}
