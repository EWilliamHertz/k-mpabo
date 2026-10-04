import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface BookingEmailProps {
  name: string;
  email: string;
  dates: string;
  guests: number;
  message: string;
}

export const BookingEmail = ({
  name,
  email,
  dates,
  guests,
  message,
}: BookingEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Ny bokningsförfrågan från {name} på Kämpabo</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Ny bokningsförfrågan</Heading>
          
          <Text style={text}>
            Du har fått en ny bokningsförfrågan via hemsidan för Kämpabo.
          </Text>
          
          <Section style={infoContainer}>
            <Text style={infoText}>
              <strong>Namn:</strong> {name}
            </Text>
            <Text style={infoText}>
              <strong>E-post:</strong> {email}
            </Text>
            <Text style={infoText}>
              <strong>Datum:</strong> {dates || 'Ej angivet'}
            </Text>
            <Text style={infoText}>
              <strong>Antal gäster:</strong> {guests || 'Ej angivet'}
            </Text>
          </Section>
          
          <Hr style={hr} />
          
          <Heading as="h2" style={h2}>
            Meddelande:
          </Heading>
          <Text style={messageText}>
            {message ? message : 'Inget meddelande angavs.'}
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            Detta e-postmeddelande skickades automatiskt från Kämpabos bokningsformulär.
            Svara på det här mailet för att kontakta kunden direkt ({email}).
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingEmail;

// Stilar för e-postmeddelandet
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  borderRadius: '8px',
  border: '1px solid #eaeaea',
  maxWidth: '600px',
  marginTop: '40px',
  marginBottom: '40px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#444',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '24px',
};

const infoContainer = {
  backgroundColor: '#fafafa',
  padding: '20px',
  borderRadius: '4px',
  marginBottom: '24px',
};

const infoText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0 0 8px',
};

const messageText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderLeft: '4px solid #a8a29e', // stone-400
  borderRadius: '4px',
};

const hr = {
  borderColor: '#eaeaea',
  margin: '24px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '13px',
  lineHeight: '16px',
  marginTop: '24px',
};
