
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UseCaseContent from '@/components/UseCaseContent';

// Use case data
const useCaseData = {
  music: {
    title: "Music Events",
    subtitle: "Perfect for concerts, festivals, and live performances",
    description: "Create memorable experiences for music fans with our comprehensive ticketing and event management platform specifically designed for concerts and festivals.",
    features: [
      {
        title: "Artist Profiles",
        description: "Showcase performing artists with detailed bios, photos, and social media links to engage attendees."
      },
      {
        title: "Seating Charts",
        description: "Interactive seating charts allow attendees to select their preferred viewing location."
      },
      {
        title: "Performance Schedules",
        description: "Create detailed timelines with set times, stages, and artist performance details."
      },
      {
        title: "Merchandise Integration",
        description: "Sell artist merchandise alongside tickets for increased revenue opportunities."
      }
    ],
    testimonial: {
      quote: "Tixify has revolutionized how we manage our annual jazz festival. The platform is intuitive for both organizers and attendees, and the analytics help us plan better each year.",
      author: "Sarah Johnson",
      role: "Festival Director, BlueNote Jazz Festival"
    },
    imageSrc: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    imageAlt: "Concert venue with crowd and stage lighting",
    primaryColor: "#2563eb"
  },
  workshops: {
    title: "Workshops & Conferences",
    subtitle: "Ideal for educational events and professional gatherings",
    description: "Streamline registration and attendance management for workshops, conferences, and professional development events with our specialized tools.",
    features: [
      {
        title: "Session Registration",
        description: "Allow attendees to register for specific sessions, workshops, or breakout rooms."
      },
      {
        title: "Speaker Management",
        description: "Create profiles for speakers with their credentials, topics, and session information."
      },
      {
        title: "Agenda Planning",
        description: "Build and share detailed event schedules with multiple tracks and session types."
      },
      {
        title: "Networking Tools",
        description: "Facilitate connections between attendees with built-in messaging and contact sharing."
      }
    ],
    testimonial: {
      quote: "We switched to Tixify for our annual tech conference and immediately saw improvements in registration efficiency and attendee satisfaction. The customization options let us create a branded experience that feels premium.",
      author: "Michael Chen",
      role: "Event Manager, TechSummit Conference"
    },
    imageSrc: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    imageAlt: "Workshop with attendees collaborating at tables",
    primaryColor: "#0EA5E9"
  },
  sports: {
    title: "Sports Events",
    subtitle: "Great for games, tournaments, and athletic competitions",
    description: "Manage ticketing for sporting events of all sizes, from local leagues to major tournaments, with our specialized sports event platform.",
    features: [
      {
        title: "Team Management",
        description: "Create and manage team profiles, rosters, and performance statistics."
      },
      {
        title: "Tournament Brackets",
        description: "Generate and display tournament brackets that update in real-time as competitions progress."
      },
      {
        title: "Venue Mapping",
        description: "Provide detailed stadium or venue maps with seating sections and amenities."
      },
      {
        title: "Stats Integration",
        description: "Connect with sports statistics APIs to display live game data and results."
      }
    ],
    testimonial: {
      quote: "As organizers of multiple youth sports tournaments throughout the year, Tixify has made our ticketing process seamless. Parents appreciate the easy mobile tickets and we love the reporting features.",
      author: "Carlos Rodriguez",
      role: "Director, Regional Youth Sports League"
    },
    imageSrc: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    imageAlt: "Sports stadium with fans during a game",
    primaryColor: "#059669"
  }
};

type UseCaseType = 'music' | 'workshops' | 'sports';

const UseCase: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const validType = (type as UseCaseType) in useCaseData ? (type as UseCaseType) : 'music';
  
  const caseData = useCaseData[validType];
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <UseCaseContent {...caseData} />
    </div>
  );
};

export default UseCase;
