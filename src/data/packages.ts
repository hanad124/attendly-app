import { Phone, Globe, MessageCircle, Smartphone } from 'lucide-react-native';
import HormuudLogo from '@/assets/images/providers/hormuud-logo.png';
import SomtelLogo from '@/assets/images/providers/somtel-logo.png';
import SomnetLogo from '@/assets/images/providers/somnet-logo.png';
import AmtelLogo from '@/assets/images/providers/amtel-logo.png';
import SomlinkLogo from '@/assets/images/providers/somlink-logo.png';

export interface Package {
  id: string;
  type: 'voice' | 'internet' | 'sms' | 'data' | 'combo';
  name: string;
  provider: string;
  providerLogo: any;
  description: string;
  icon: any;
  minutes?: number;
  data?: string;
  sms?: number;
  duration: number;
  price: number;
}

export const packages: Package[] = [
  // Voice Packages
  {
    id: 'voice-100-hormuud',
    type: 'voice',
    name: 'Voice Pack',
    provider: 'Hormuud',
    providerLogo: HormuudLogo,
    description: 'Budget-friendly voice package with 100 minutes for light users.',
    icon: Phone,
    minutes: 100,
    duration: 30,
    price: 9.99
  },
  {
    id: 'voice-200-somtel',
    type: 'voice',
    name: 'Voice Pack',
    provider: 'Somtel',
    providerLogo: SomtelLogo,
    description: 'Ideal package with 200 minutes for regular communicators.',
    icon: Phone,
    minutes: 200,
    duration: 30,
    price: 14.99
  },
  {
    id: 'voice-300-somnet',
    type: 'voice',
    name: 'Voice Pack',
    provider: 'Somnet',
    providerLogo: SomnetLogo,
    description: 'Extended voice package with 300 minutes for frequent callers.',
    icon: Phone,
    minutes: 300,
    duration: 30,
    price: 19.99
  },
  {
    id: 'voice-500-amtel',
    type: 'voice',
    name: 'Voice Pack',
    provider: 'Amtel',
    providerLogo: AmtelLogo,
    description: 'Comprehensive voice solution with 500 minutes for heavy phone users.',
    icon: Phone,
    minutes: 500,
    duration: 30,
    price: 29.99
  },
  {
    id: 'voice-750-somlink',
    type: 'voice',
    name: 'Voice Pack',
    provider: 'Somlink',
    providerLogo: SomlinkLogo,
    description: 'Ultimate voice package with 750 minutes for professionals and constant communicators.',
    icon: Phone,
    minutes: 750,
    duration: 30,
    price: 39.99
  },
  
  // Internet Packages 
  {
    id: 'internet-5-hormuud',
    type: 'internet',
    name: 'Internet Pack',
    provider: 'Hormuud',
    providerLogo: HormuudLogo,
    description: 'Entry-level data package with 5 GB for light browsing and occasional use.',
    icon: Globe,
    data: '5 GB',
    duration: 30,
    price: 9.99
  },
  {
    id: 'internet-10-somtel',
    type: 'internet',
    name: 'Internet Pack',
    provider: 'Somtel',
    providerLogo: SomtelLogo,
    description: 'Balanced 10 GB package for moderate internet usage and streaming.',
    icon: Globe,
    data: '10 GB',
    duration: 30,
    price: 14.99
  },
  {
    id: 'internet-20-somnet',
    type: 'internet',
    name: 'Internet Pack',
    provider: 'Somnet',
    providerLogo: SomnetLogo,
    description: 'High-capacity 20 GB package for heavy internet users and content creators.',
    icon: Globe,
    data: '20 GB',
    duration: 30,
    price: 24.99
  },
  {
    id: 'internet-30-amtel',
    type: 'internet',
    name: 'Internet Pack',
    provider: 'Amtel',
    providerLogo: AmtelLogo,
    description: 'Premium 30 GB package for power users, remote workers, and multi-device households.',
    icon: Globe,
    data: '30 GB',
    duration: 30,
    price: 34.99
  },
  {
    id: 'internet-50-somlink',
    type: 'internet',
    name: 'Internet Pack',
    provider: 'Somlink',
    providerLogo: SomlinkLogo,
    description: 'Unlimited experience with 50 GB of high-speed data for the most demanding users.',
    icon: Globe,
    data: '50 GB',
    duration: 30,
    price: 49.99
  },
  
  // SMS Packages 
  {
    id: 'sms-500-hormuud',
    type: 'sms',
    name: 'SMS Pack',
    provider: 'Hormuud',
    providerLogo: HormuudLogo,
    description: 'Starter SMS package with 500 messages for occasional texters.',
    icon: MessageCircle,
    sms: 500,
    duration: 30,
    price: 9.99
  },
  {
    id: 'sms-1000-somtel',
    type: 'sms',
    name: 'SMS Pack',
    provider: 'Somtel',
    providerLogo: SomtelLogo,
    description: 'Comprehensive SMS package with 1000 messages for frequent communicators.',
    icon: MessageCircle,
    sms: 1000,
    duration: 30,
    price: 14.99
  },
  {
    id: 'sms-1500-somnet',
    type: 'sms',
    name: 'SMS Pack',
    provider: 'Somnet',
    providerLogo: SomnetLogo,
    description: 'Extended SMS package with 1500 messages for heavy texters.',
    icon: MessageCircle,
    sms: 1500,
    duration: 30,
    price: 19.99
  },
  {
    id: 'sms-2000-amtel',
    type: 'sms',
    name: 'SMS Pack',
    provider: 'Amtel',
    providerLogo: AmtelLogo,
    description: 'Unlimited texting experience with 2000 messages.',
    icon: MessageCircle,
    sms: 2000,
    duration: 30,
    price: 24.99
  },
  {
    id: 'sms-2500-somlink',
    type: 'sms',
    name: 'SMS Pack',
    provider: 'Somlink',
    providerLogo: SomlinkLogo,
    description: 'Ultimate SMS package with 2500 messages for non-stop communication.',
    icon: MessageCircle,
    sms: 2500,
    duration: 30,
    price: 29.99
  }
];
