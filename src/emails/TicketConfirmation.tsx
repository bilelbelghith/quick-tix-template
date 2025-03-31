
import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { format } from 'date-fns';

interface TicketConfirmationEmailProps {
  attendeeName: string;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  ticketType: string;
  ticketQuantity: number;
  totalAmount: number;
  organizerLogo?: string;
  organizerName: string;
  eventImageUrl?: string;
  ticketDownloadUrl: string;
}

export const TicketConfirmationEmail: React.FC<TicketConfirmationEmailProps> = ({
  attendeeName,
  eventName,
  eventDate,
  eventLocation,
  ticketType,
  ticketQuantity,
  totalAmount,
  organizerLogo,
  organizerName,
  eventImageUrl,
  ticketDownloadUrl,
}) => {
  const previewText = `Your tickets for ${eventName} are confirmed!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            {organizerLogo && (
              <Img src={organizerLogo} width="64" height="64" alt={organizerName} style={logo} />
            )}
          </Section>
          
          <Heading style={heading}>Ticket Confirmation</Heading>
          
          <Text style={paragraph}>
            Hello {attendeeName},
          </Text>
          
          <Text style={paragraph}>
            Thank you for your purchase! Your tickets for <strong>{eventName}</strong> are confirmed.
          </Text>
          
          {eventImageUrl && (
            <Img src={eventImageUrl} width="100%" alt={eventName} style={eventImage} />
          )}
          
          <Section style={ticketInfoSection}>
            <Heading as="h2" style={subheading}>Event Details</Heading>
            
            <Text style={ticketInfoText}>
              <strong>Event:</strong> {eventName}
            </Text>
            
            <Text style={ticketInfoText}>
              <strong>Date:</strong> {format(eventDate, 'EEEE, MMMM d, yyyy - h:mm a')}
            </Text>
            
            <Text style={ticketInfoText}>
              <strong>Location:</strong> {eventLocation}
            </Text>
            
            <Text style={ticketInfoText}>
              <strong>Ticket Type:</strong> {ticketType}
            </Text>
            
            <Text style={ticketInfoText}>
              <strong>Quantity:</strong> {ticketQuantity}
            </Text>
            
            <Text style={ticketInfoText}>
              <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
            </Text>
          </Section>
          
          <Section style={ctaContainer}>
            <Link href={ticketDownloadUrl} style={ctaButton}>
              Download Your Tickets
            </Link>
          </Section>
          
          <Text style={paragraph}>
            Your tickets are also attached to this email as a PDF. You can print them or show them on your mobile device at the event.
          </Text>
          
          <Text style={paragraph}>
            We look forward to seeing you at the event!
          </Text>
          
          <Text style={signature}>
            The {organizerName} Team
          </Text>
          
          <Section style={footerSection}>
            <Text style={footerText}>
              This email was sent by Tixify on behalf of {organizerName}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Email styles
const main = {
  backgroundColor: '#f9fafb',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '24px',
  maxWidth: '600px',
};

const logoContainer = {
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const logo = {
  borderRadius: '50%',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  color: '#6D28D9',
  margin: '28px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
};

const eventImage = {
  borderRadius: '8px',
  marginBottom: '24px',
};

const ticketInfoSection = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
};

const subheading = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#111827',
  marginTop: '0',
  marginBottom: '16px',
};

const ticketInfoText = {
  fontSize: '15px',
  lineHeight: '24px',
  marginBottom: '8px',
};

const ctaContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
  marginBottom: '32px',
};

const ctaButton = {
  backgroundColor: '#6D28D9',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
};

const signature = {
  fontSize: '16px',
  lineHeight: '26px',
  marginTop: '32px',
  marginBottom: '32px',
  fontStyle: 'italic',
};

const footerSection = {
  borderTop: '1px solid #e5e7eb',
  paddingTop: '24px',
};

const footerText = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#6b7280',
  textAlign: 'center' as const,
};

export default TicketConfirmationEmail;
