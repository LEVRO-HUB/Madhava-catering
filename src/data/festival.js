// Festival / offer banner. Disabled by default.
// To run a promotion: set enabled: true, edit the text, optionally set
// `until` (YYYY-MM-DD, banner hides after that date) and a `link`.
// Preview any time without editing: add ?banner=1 to the URL.
// Do NOT put discounts or dates here that the business has not confirmed.
export const festivalBanner = {
  enabled: false,
  id: 'festival-2026', // change the id for each new campaign (re-shows to people who dismissed the last one)
  text: 'Planning a festival or family function? Book your catering early.',
  textTa: 'பண்டிகை அல்லது குடும்ப விழா திட்டமிடுகிறீர்களா? முன்கூட்டியே கேட்டரிங் பதிவு செய்யுங்கள்.',
  cta: 'Plan Your Event',
  ctaTa: 'நிகழ்ச்சியைத் திட்டமிடுங்கள்',
  link: '/plan-your-event',
  until: '', // e.g. '2026-11-30'
};
