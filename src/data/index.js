
/* ==========================================
   FITNESS PLAYGROUND
   Central Website Configuration
========================================== */

// IMAGE ASSETS
import logo from '../assets/p01.png'
import banner from '../assets/p02.png'

import p05 from '../assets/p05.png'
import p06 from '../assets/p06.png'
import p07 from '../assets/p07.png'
import p08 from '../assets/p08.png'
import p09 from '../assets/p09.png'
import p10 from '../assets/p10.png'
import p11 from '../assets/p11.png'
import p12 from '../assets/p12.png'
import p13 from '../assets/p13.png'
import p14 from '../assets/p14.png'
import p15 from '../assets/p15.png'
import p16 from '../assets/p16.png'

import p17 from '../assets/p17.jpg'
import p18 from '../assets/p18.jpg'
import p19 from '../assets/p19.jpg'
import p20 from '../assets/p20.jpg'
import p21 from '../assets/p21.jpg'


/* ==========================================
   BRAND CONFIGURATION
========================================== */

export const brand = {
  name: 'Fitness Playground',
  shortName: 'Fitness Playground',
  slogan: 'Train. Build. Repeat.',
  tagline: 'Fitness. Community. Progress.',

  colors: {
    primary: '#DC2626',
    secondary: '#090909',
    background: '#050505',
    surface: '#111111',
    text: '#FFFFFF',
    muted: '#A1A1AA',
  },

  typography: {
    heading: 'font-display',
    body: 'font-sans',
  },
}


/* ==========================================
   GYM INFORMATION
========================================== */

export const gym = {
  name: brand.name,
  tagline: brand.tagline,

  address: 'Rocka Complex, Tabang, Plaridel, Bulacan 3004',

  phone: '09652487821',

  hours: [
    {
      days: 'Monday – Saturday',
      time: '6:00 AM – 10:30 PM',
      last: 'Last entry 9:30 PM',
    },
    {
      days: 'Sunday',
      time: '7:00 AM – 10:00 PM',
      last: 'Last entry 9:00 PM',
    },
  ],
}


/* ==========================================
   WEBSITE IMAGES
========================================== */

export const images = {
  logo,
  banner,
  hero: p16,
  about: p12,
}


/* ==========================================
   NAVIGATION
========================================== */

export const nav = [
  'Home',
  'About',
  'Programs',
  'Membership',
  'Contact',
]


/* ==========================================
   GYM STATISTICS
========================================== */

export const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Active Members',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Professional Trainers',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years of Experience',
  },
]


/* ==========================================
   FITNESS PROGRAMS
========================================== */

export const programs = [
  {
    id: 'strength-training',
    title: 'Strength Training',
    img: p14,
    text: 'Olympic benches, racks and plate-loaded machines built for heavy, honest lifting.',
  },
  {
    id: 'bodybuilding',
    title: 'Bodybuilding',
    img: p11,
    text: 'Cable stations, hammer-style machines and full dumbbell racks to sculpt every muscle.',
  },
  {
    id: 'weight-loss',
    title: 'Weight Loss & Fat Burning',
    img: p09,
    text: 'Treadmills, stair climber and coached circuits designed to torch calories.',
  },
  {
    id: 'personal-training',
    title: 'Personal Training',
    img: p12,
    text: 'One-on-one coaching with a plan, accountability and technique that sticks.',
  },
  {
    id: 'cardio-training',
    title: 'Cardio Training',
    img: p10,
    text: 'Spin bikes, treadmills and climbers to build endurance and a stronger heart.',
  },
  {
    id: 'functional-fitness',
    title: 'Functional Fitness',
    img: p16,
    text: 'Move better with free weights, benches and open floor space for real-world strength.',
  },
]


/* ==========================================
   WHY CHOOSE FITNESS PLAYGROUND
========================================== */

export const why = [
  [
    'Dumbbell',
    'Modern Fitness Equipment',
    'Plate-loaded and selectorized machines in a red-and-black floor built for lifters.',
  ],
  [
    'BadgeCheck',
    'Certified Professional Trainers',
    'Coaches who program with purpose and correct your form.',
  ],
  [
    'Wallet',
    'Flexible Membership Plans',
    'Day, week and month passes, plus student rates and a happy hour.',
  ],
  [
    'Maximize',
    'Spacious Workout Areas',
    'Rubber flooring and room to move, even at peak hours.',
  ],
  [
    'Users',
    'Friendly Fitness Community',
    'Train beside people who push you to show up.',
  ],
  [
    'Sparkles',
    'Clean & Well-Maintained',
    'Equipment wiped, racks organized and lockers ready.',
  ],
]


/* ==========================================
   MEMBERSHIP PLANS
========================================== */

export const plans = [
  {
    id: 'student-member',
    name: 'Student Member',
    price: '₱800',
    per: '/ month',
    features: [
      'Full gym access',
      'Valid student ID required',
      'Day pass ₱80',
      'Locker access',
    ],
  },

  {
    id: 'regular-member',
    name: 'Member',
    price: '₱1,000',
    per: '/ month',
    featured: true,
    features: [
      'Unlimited gym access',
      'Cardio & weight areas',
      'Week pass ₱400 · Day pass ₱100',
      'Happy Hour ₱60 (12–3 PM)',
    ],
  },

  {
    id: 'weekly-pass',
    name: 'Weekly Pass',
    price: '₱400',
    per: '/ week',
    features: [
      'Member rate access',
      'Perfect for trying us out',
      'Cardio & weight areas',
      'Locker access',
    ],
  },
]


/* ==========================================
   ADDITIONAL MEMBERSHIP FEES
========================================== */

export const fees =
  'Membership fee: ₱800 annual · ₱2,500 lifetime (students ₱500 annual). Non-member day pass ₱150 · Student non-member day pass ₱100. Happy Hour ₱60 for members and non-members (12–3 PM).'


/* ==========================================
   GYM PHOTO GALLERY
========================================== */

export const gallery = [
  {
    src: p16,
    alt: 'Fitness Playground gym interior',
  },
  {
    src: p14,
    alt: 'Barbell bench press equipment',
  },
  {
    src: p05,
    alt: 'Plate-loaded gym machine',
  },
  {
    src: p09,
    alt: 'Treadmill and stair climber',
  },
  {
    src: p07,
    alt: 'Leg press machine',
  },
  {
    src: p13,
    alt: 'Leg extension and curl machine',
  },
  {
    src: p15,
    alt: 'Hip abductor machine',
  },
  {
    src: p06,
    alt: 'Lat pulldown machine',
  },
  {
    src: p08,
    alt: 'Assisted pull-up station',
  },
  {
    src: p17,
    alt: 'Gym equipment and workout area',
  },
  {
    src: p18,
    alt: 'Fitness Playground equipment',
  },
  {
    src: p19,
    alt: 'Gym workout area',
  },
  {
    src: p20,
    alt: 'Fitness equipment',
  },
  {
    src: p21,
    alt: 'Gym interior and facilities',
  },
]
