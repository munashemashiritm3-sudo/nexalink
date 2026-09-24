import { MOCK_CLIENT_DATA, COMPANY_INFO } from '../data/mockData';

const NOTIFICATIONS_LOG_KEY = 'nexalink_notifications_log';

/**
 * Get stored notification logs from localStorage (or defaults)
 */
export function getNotificationLogs() {
  try {
    const saved = localStorage.getItem(NOTIFICATIONS_LOG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read notification logs from localStorage', e);
  }

  // Initial seed logs demonstrating historical automated 08:00 AM runs
  return [
    {
      id: 'LOG-884901',
      timestamp: '2026-09-15 08:00:12',
      recipientName: 'Tafadzwa Moyo (Harare Logistics Co.)',
      recipientContact: '+263 788 172 075',
      channel: 'WhatsApp / SMS',
      alertType: 'ZINARA Expiry Warning',
      targetEntity: 'AEG-4902 (Toyota Fortuner)',
      severity: 'critical',
      message: '🚨 URGENT: ZINARA Road License for Toyota Fortuner (AEG-4902) expires today! Avoid police impound fines. Click here to renew with same-day disc delivery: https://nexalink.co.zw/renew/AEG-4902',
      status: 'Dispatched'
    },
    {
      id: 'LOG-884902',
      timestamp: '2026-09-15 08:00:14',
      recipientName: 'Tafadzwa Moyo (Harare Logistics Co.)',
      recipientContact: 'tafadzwa@hararelogistics.co.zw',
      channel: 'Email (SendGrid)',
      alertType: 'Outstanding Balance Reminder',
      targetEntity: 'Invoice INV-2026-081',
      severity: 'warning',
      message: 'Notice: Your Nexalink monthly account statement has an outstanding balance of US$77.00 for Starlink Infinity Connect. Please settle via EcoCash or Bank Transfer to ensure uninterrupted service.',
      status: 'Dispatched'
    }
  ];
}

/**
 * Save notification logs to localStorage
 */
export function saveNotificationLogs(logs) {
  try {
    localStorage.setItem(NOTIFICATIONS_LOG_KEY, JSON.stringify(logs));
  } catch (e) {
    console.warn('Could not save notification logs to localStorage', e);
  }
}

/**
 * Calculates days remaining between today and a target date string (YYYY-MM-DD)
 */
export function getDaysRemaining(targetDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Executes the 08:00 AM scheduled alert evaluation logic
 * Scans for vehicle renewals within 14, 7, or 1 days (or overdue)
 * and unpaid invoices / outstanding balances > 0.
 */
export function runScheduledAlertCheck(clientData = MOCK_CLIENT_DATA) {
  const currentLogs = getNotificationLogs();
  const newLogs = [];
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').slice(0, 19);

  // 1. Vehicle Renewal Checks (ZINARA & Insurance)
  clientData.fleetVehicles.forEach((vehicle) => {
    const zinaraDays = getDaysRemaining(vehicle.zinaraExpiry);
    const insDays = getDaysRemaining(vehicle.insuranceExpiry);

    // Evaluate 14, 7, 1 day, or already overdue (<= 0)
    const triggerThresholds = [14, 7, 1];
    const isZinaraDue = triggerThresholds.includes(zinaraDays) || zinaraDays <= 0;
    const isInsDue = triggerThresholds.includes(insDays) || insDays <= 0;

    if (isZinaraDue) {
      const dedupKey = `ZINARA_${vehicle.reg}_${now.toISOString().slice(0, 10)}`;
      const alreadySent = currentLogs.some(l => l.dedupKey === dedupKey);

      if (!alreadySent) {
        const urgencyText = zinaraDays <= 0 ? 'OVERDUE' : `due in ${zinaraDays} day(s)`;
        const logEntry = {
          id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
          dedupKey,
          timestamp: dateStr,
          recipientName: `${clientData.clientName} (${clientData.companyName})`,
          recipientContact: COMPANY_INFO.phone,
          channel: 'WhatsApp / SMS',
          alertType: 'ZINARA License Alert',
          targetEntity: `${vehicle.reg} (${vehicle.model})`,
          severity: zinaraDays <= 1 ? 'critical' : 'warning',
          message: `🚨 Nexalink Alert: ZINARA Road License for ${vehicle.model} [${vehicle.reg}] is ${urgencyText} (${vehicle.zinaraExpiry}). Same-day physical disc delivery available in Harare. Reply or visit portal to renew.`,
          status: 'Dispatched'
        };
        newLogs.push(logEntry);
      }
    }

    if (isInsDue && vehicle.insuranceExpiry !== vehicle.zinaraExpiry) {
      const dedupKey = `INS_${vehicle.reg}_${now.toISOString().slice(0, 10)}`;
      const alreadySent = currentLogs.some(l => l.dedupKey === dedupKey);

      if (!alreadySent) {
        const urgencyText = insDays <= 0 ? 'OVERDUE' : `due in ${insDays} day(s)`;
        const logEntry = {
          id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
          dedupKey,
          timestamp: dateStr,
          recipientName: `${clientData.clientName} (${clientData.companyName})`,
          recipientContact: COMPANY_INFO.email,
          channel: 'Email (SendGrid)',
          alertType: 'Insurance Expiry Alert',
          targetEntity: `${vehicle.reg} (${vehicle.model})`,
          severity: insDays <= 1 ? 'critical' : 'warning',
          message: `Dear ${clientData.clientName}, Third-Party & Comprehensive Insurance for vehicle ${vehicle.reg} is ${urgencyText} (${vehicle.insuranceExpiry}). Instant policy certificate issuance available via Nexalink portal.`,
          status: 'Dispatched'
        };
        newLogs.push(logEntry);
      }
    }
  });

  // 2. Outstanding Balance & Overdue Invoices Check
  if (clientData.balance > 0) {
    const unpaidInvoices = clientData.invoices.filter(inv => inv.status === 'Unpaid');
    const dedupKey = `BALANCE_${clientData.accountNumber}_${now.toISOString().slice(0, 10)}`;
    const alreadySent = currentLogs.some(l => l.dedupKey === dedupKey);

    if (!alreadySent) {
      const invList = unpaidInvoices.map(i => `${i.id} (US$${i.amount.toFixed(2)})`).join(', ');
      const logEntry = {
        id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
        dedupKey,
        timestamp: dateStr,
        recipientName: `${clientData.clientName} (${clientData.companyName})`,
        recipientContact: COMPANY_INFO.phone,
        channel: 'WhatsApp / SMS',
        alertType: 'Unpaid Balance Alert',
        targetEntity: `Account ${clientData.accountNumber} - US$${clientData.balance.toFixed(2)}`,
        severity: 'warning',
        message: `📢 Nexalink Billing Reminder: Account ${clientData.accountNumber} has an outstanding balance of US$${clientData.balance.toFixed(2)} [Invoices: ${invList}]. Pay seamlessly via EcoCash / InnBucks to maintain active SLA status.`,
        status: 'Dispatched'
      };
      newLogs.push(logEntry);
    }
  }

  // Save updated logs
  const updatedLogs = [...newLogs, ...currentLogs];
  saveNotificationLogs(updatedLogs);

  return {
    dispatchedCount: newLogs.length,
    newLogs,
    allLogs: updatedLogs
  };
}
