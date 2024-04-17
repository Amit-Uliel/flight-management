// file to get fonts
import { IBM_Plex_Sans_Hebrew } from "next/font/google";

const ibmPlexSansHebrew = IBM_Plex_Sans_Hebrew({ 
  subsets: ["latin"],
  weight: ['300', '500' ,'700'],
  variable: '--font-ibm-hebrew',
});

export const ibmhebrew = ibmPlexSansHebrew.variable;