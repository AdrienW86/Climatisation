export const business = {
  name: 'Location Climatisation',
  operator: 'Gregory Roblès',
  legalForm: '',
  siren: '',
  siret: '',
  address: '',
  email: '',
  phone: '',
  commercial: { email: '', phone: '' },
  vat: '',
  registration: '',
  shareCapital: '',
  consumerMediator: { name: '', contact: '' },
  publicationDirector: '',
  host: {
    name: 'Vercel Inc.',
    address: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis',
    contact: 'https://vercel.com/help',
    phone: '',
    confirmed: false,
    source: 'https://vercel.com/legal/dpa',
  },
  registry: { url: '', verifiedAt: '', identityConfirmed: false },
  retentionMonths: 12,
};
export function legalReady() {
  return (
    process.env.BUSINESS_VERIFIED === 'true' &&
    Boolean(
      business.legalForm &&
      business.siren &&
      business.siret &&
      business.address &&
      business.email &&
      business.publicationDirector &&
      business.registry.identityConfirmed &&
      business.registry.url &&
      business.registry.verifiedAt &&
      business.host.confirmed &&
      business.host.name &&
      business.host.address &&
      business.host.phone &&
      business.host.contact,
    )
  );
}
