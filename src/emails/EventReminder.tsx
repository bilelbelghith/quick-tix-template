
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

interface EventReminderEmailProps {
  attendeeName: string;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  ticketType: string;
  organizerName: string;
  eventImageUrl?: string;
  ticketDownloadUrl: string;
  eventDetailsUrl: string;
}

export const EventReminderEmail: React.FC<EventReminderEmailProps> = ({
  attendeeName,
  eventName,
  eventDate,
  eventLocation,
  ticketType,
  organizerName,
  eventImageUrl,
  ticketDownloadUrl,
  eventDetailsUrl,
}) => {
  const previewText = `Your event is tomorrow: ${eventName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Event Reminder</Heading>
          
          <Text style={paragraph}>
            Hello {attendeeName},
          </Text>
          
          <Text style={paragraph}>
            This is a friendly reminder that <strong>{eventName}</strong> is happening tomorrow!
          </Text>
          
          {eventImageUrl && (
            <Img src={eventImageUrl} width="100%" alt={eventName} style={eventImage} />
          )}
          
          <Section style={eventInfoSection}>
            <Heading as="h2" style={subheading}>Event Details</Heading>
            
            <Text style={eventInfoText}>
              <strong>Event:</strong> {eventName}
            </Text>
            
            <Text style={eventInfoText}>
              <strong>Date:</strong> {format(eventDate, 'EEEE, MMMM d, yyyy - h:mm a')}
            </Text>
            
            <Text style={eventInfoText}>
              <strong>Location:</strong> {eventLocation}
            </Text>
            
            <Text style={eventInfoText}>
              <strong>Ticket Type:</strong> {ticketType}
            </Text>
          </Section>
          
          <Section style={ctaContainer}>
            <Link href={ticketDownloadUrl} style={ctaButton}>
              Download Your Tickets
            </Link>
          </Section>
          
          <Text style={paragraph}>
            Don't forget to bring your ticket, either printed or on your mobile device. For more information about the event, please visit the <Link href={eventDetailsUrl} style={link}>event page</Link>.
          </Text>
          
          <Text style={paragraph}>
            We look forward to seeing you tomorrow!
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

const link = {
  color: '#6D28D9',
  textDecoration: 'underline',
};

const eventImage = {
  borderRadius: '8px',
  marginBottom: '24px',
};

const eventInfoSection = {
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

const eventInfoText = {
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

export default EventReminderEmail;
