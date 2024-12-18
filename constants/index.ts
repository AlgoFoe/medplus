export type IconName = "/FaHome" | "/FaStar" | "/FaBriefcaseMedical" | "/FaUser" |"/FaStethoscope";
// patient
export const patientNavLinks :{label: string; route: string; icon: IconName }[] = [
  {
    label: 'Home',
    route: '/patient',
    icon: '/FaHome',
  },
  {
    label: 'Health Calendar ',
    route: '/patient/features/health-calendar',
    icon: '/FaStar',
  },  
  {
    label: 'Care Finder',
    route: '/patient/features/care-finder',
    icon: '/FaStar',
  },  
  {
    label: 'My Health Vault',
    route: '/patient/features/my-health-vault',
    icon: '/FaBriefcaseMedical',
  },
  {
    label: 'Health Connect',
    route: '/patient/features/health-connect',
    icon: '/FaStethoscope',
  },
  {
    label: 'Feature 5',
    route: '/',
    icon: '/FaStar',
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: '/FaUser',
  },
];
