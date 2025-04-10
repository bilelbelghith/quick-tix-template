
import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { format } from 'date-fns';

interface PayoutNotificationEmailProps {
  organizerName: string;
  payoutAmount: number;
  payoutDate: Date;
  accountLast4: string;
  events: {
    name: string;
    ticketsSold: number;
    revenue: number;
  }[];
  dashboardUrl: string;
}

export const PayoutNotificationEmail: React.FC<PayoutNotificationEmailProps> = ({
  organizerName,
  payoutAmount,
  payoutDate,
  accountLast4,
  events,
  dashboardUrl,
}) => {
  const previewText = `Your payout of $${payoutAmount.toFixed(2)} has been initiated`;
  
  // Calculate total tickets sold
  const totalTickets = events.reduce((sum, event) => sum + event.ticketsSold, 0);

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Payout Notification</Heading>
          
          <Text style={paragraph}>
            Hello {organizerName},
          </Text>
          
          <Text style={paragraph}>
            Great news! We've initiated a payout of <strong>${payoutAmount.toFixed(2)}</strong> to your bank account ending in {accountLast4}.
          </Text>
          
          <Text style={paragraph}>
            This payment should arrive in your account within 2-3 business days, depending on your bank's processing time.
          </Text>
          
          <Section style={infoSection}>
            <Heading as="h2" style={subheading}>Payout Details</Heading>
            
            <Text style={infoText}>
              <strong>Amount:</strong> ${payoutAmount.toFixed(2)}
            </Text>
            
            <Text style={infoText}>
              <strong>Date Initiated:</strong> {format(payoutDate, 'MMMM d, yyyy')}
            </Text>
            
            <Text style={infoText}>
              <strong>Account:</strong> •••• {accountLast4}
            </Text>
            
            <Text style={infoText}>
              <strong>Total Tickets Sold:</strong> {totalTickets}
            </Text>
          </Section>
          
          <Heading as="h3" style={tableHeading}>Event Breakdown</Heading>
          
          <Section style={tableContainer}>
            {/* Custom table header */}
            <div style={tableRow}>
              <div style={tableHeaderCell}>Event</div>
              <div style={tableHeaderCell}>Tickets Sold</div>
              <div style={tableHeaderCell}>Revenue</div>
            </div>
            
            {/* Table body */}
            {events.map((event, index) => (
              <div key={index} style={index % 2 === 0 ? tableRowEven : tableRowOdd}>
                <div style={tableDataCell}>{event.name}</div>
                <div style={{...tableDataCell, textAlign: 'center'}}>{event.ticketsSold}</div>
                <div style={{...tableDataCell, textAlign: 'right'}}>${event.revenue.toFixed(2)}</div>
              </div>
            ))}
          </Section>
          
          <Text style={paragraph}>
            Visit your <a href={dashboardUrl} style={link}>organizer dashboard</a> for more details and to manage your events.
          </Text>
          
          <Text style={paragraph}>
            Thank you for using Tixify for your event ticketing needs!
          </Text>
          
          <Text style={signature}>
            The Tixify Team
          </Text>
          
          <Section style={footerSection}>
            <Text style={footerText}>
              © 2023 Tixify. All rights reserved.
            </Text>
            <Text style={footerText}>
              This is an automated message, please do not reply to this email.
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

const infoSection = {
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

const infoText = {
  fontSize: '15px',
  lineHeight: '24px',
  marginBottom: '8px',
};

const tableHeading = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#111827',
  marginTop: '32px',
  marginBottom: '16px',
};

// New table styles using div-based layout
const tableContainer = {
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '32px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
};

const tableRow = {
  display: 'flex' as const,
  width: '100%',
  backgroundColor: '#6D28D9',
  color: '#ffffff',
};

const tableRowEven = {
  display: 'flex' as const,
  width: '100%',
  backgroundColor: '#ffffff',
};

const tableRowOdd = {
  display: 'flex' as const,
  width: '100%',
  backgroundColor: '#f9f9f9',
};

const tableHeaderCell = {
  flex: 1,
  padding: '12px 16px',
  fontWeight: 'bold',
  fontSize: '14px',
};

const tableDataCell = {
  flex: 1,
  padding: '12px 16px',
  borderBottom: '1px solid #e5e7eb',
  fontSize: '14px',
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
  margin: '8px 0',
};

export default PayoutNotificationEmail;
