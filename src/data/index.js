import logo from '../assets/p01.png'
import banner from '../assets/p02.png'
import p05 from '../assets/p05.png'; import p06 from '../assets/p06.png'; import p07 from '../assets/p07.png'
import p08 from '../assets/p08.png'; import p09 from '../assets/p09.png'; import p10 from '../assets/p10.png'
import p11 from '../assets/p11.png'; import p12 from '../assets/p12.png'; import p13 from '../assets/p13.png'
import p14 from '../assets/p14.png'; import p15 from '../assets/p15.png'; import p16 from '../assets/p16.png'
import p17 from '../assets/p17.jpg'; import p18 from '../assets/p18.jpg'; import p19 from '../assets/p19.jpg'
import p20 from '../assets/p20.jpg'; import p21 from '../assets/p21.jpg'

export const gym = {
  name: 'Fitness Playground', tagline: 'Fitness. Community. Progress.',
  address: 'Rocka Complex, Tabang, Plaridel, Bulacan 3004',
  phone: '+63 900 000 0000', email: 'hello@fitnessplayground.ph', // TODO: edit
  hours: [
    { days: 'Monday – Saturday', time: '6:00 AM – 10:30 PM', last: 'Last entry 9:30 PM' },
    { days: 'Sunday', time: '7:00 AM – 10:00 PM', last: 'Last entry 9:00 PM' },
  ],
}
export const images = { logo, banner, hero: p16, about: p12 }
export const nav = ['Home', 'About', 'Programs', 'Membership', 'Contact']
export const stats = [
  { value: 500, suffix: '+', label: 'Active Members' },
  { value: 15, suffix: '+', label: 'Professional Trainers' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
]
export const programs = [
  { title: 'Strength Training', img: p14, text: 'Olympic benches, racks and plate-loaded machines built for heavy, honest lifting.' },
  { title: 'Bodybuilding', img: p11, text: 'Cable stations, hammer-style machines and full dumbbell racks to sculpt every muscle.' },
  { title: 'Weight Loss & Fat Burning', img: p09, text: 'Treadmills, stair climber and coached circuits designed to torch calories.' },
  { title: 'Personal Training', img: p12, text: 'One-on-one coaching with a plan, accountability and technique that sticks.' },
  { title: 'Cardio Training', img: p10, text: 'Spin bikes, treadmills and climbers to build endurance and a stronger heart.' },
  { title: 'Functional Fitness', img: p16, text: 'Move better with free weights, benches and open floor space for real-world strength.' },
]
export const why = [
  ['Dumbbell', 'Modern Fitness Equipment', 'Plate-loaded and selectorized machines in a red-and-black floor built for lifters.'],
  ['BadgeCheck', 'Certified Professional Trainers', 'Coaches who program with purpose and correct your form.'],
  ['Wallet', 'Flexible Membership Plans', 'Day, week and month passes, plus student rates and a happy hour.'],
  ['Maximize', 'Spacious Workout Areas', 'Rubber flooring and room to move, even at peak hours.'],
  ['Users', 'Friendly Fitness Community', 'Train beside people who push you to show up.'],
  ['Sparkles', 'Clean & Well-Maintained', 'Equipment wiped, racks organized and lockers ready.'],
]
// Prices from the gym's rate board. Edit freely.
export const plans = [
  { name: 'Student Member', price: '₱800', per: '/ month', features: ['Full gym access', 'Valid student ID required', 'Day pass ₱80', 'Locker access'] },
  { name: 'Member', price: '₱1,000', per: '/ month', featured: true, features: ['Unlimited gym access', 'Cardio & weight areas', 'Week pass ₱400 · Day pass ₱100', 'Happy Hour ₱60 (12–3 PM)'] },
  { name: 'Weekly Pass', price: '₱400', per: '/ week', features: ['Member rate access', 'Perfect for trying us out', 'Cardio & weight areas', 'Locker access'] },
]
export const fees = 'Membership fee: ₱800 annual · ₱2,500 lifetime (students ₱500 annual). Non-member day pass ₱150 · Student non-member day pass ₱100. Happy Hour ₱60 for members and non-members (12–3 PM).'
// Order matters: photos fill the masonry columns top to bottom, so put the best shots first.
// Alt text must stay unique. Rename p17-p21 to describe the real photos.
export const gallery = [
  { src: p16, alt: 'Gym interior' },
  { src: p14, alt: 'Barbell bench press' },
  { src: p05, alt: 'Plate-loaded machine' },
  { src: p09, alt: 'Treadmill and stair climber' },
  { src: p07, alt: 'Leg press' },
  { src: p13, alt: 'Leg extension and curl' },
  { src: p15, alt: 'Hip abductor' },
  { src: p06, alt: 'Lat machine' },
  { src: p08, alt: 'Assisted pull-up station' },
  { src: p17, alt: 'Gym equipment 1' },
  { src: p18, alt: 'Gym equipment 2' },
  { src: p19, alt: 'Gym equipment 3' },
  { src: p20, alt: 'Gym equipment 4' },
  { src: p21, alt: 'Gym equipment 5' },
]