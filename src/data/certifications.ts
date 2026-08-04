/**
 * CERTIFICATIONS DATA
 * ====================
 * Professional certifications and credentials displayed in the Certifications section.
 *
 * HOW TO EDIT:
 * - Add a certification: copy an object and fill in all fields
 * - Remove a certification: delete its object
 * - issuerLogo: path to a logo in /public (e.g. "/logos/aws.svg") or a CDN URL
 * - credentialUrl: link to verify the credential (e.g. Credly, Coursera)
 * - expiryDate: omit entirely if the certification does not expire
 * - Format for dates: "YYYY-MM" (e.g. "2024-06")
 */

export interface Certification {
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issuerLogo: "/logos/aws.svg",
    issueDate: "2024-06",
    expiryDate: "2027-06",
    credentialUrl: "https://www.credly.com/badges/xxxx",
    credentialId: "AWS-SAA-XXXX",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta",
    issuerLogo: "/logos/meta.svg",
    issueDate: "2023-11",
    credentialUrl: "https://coursera.org/verify/xxxx",
  },
];
