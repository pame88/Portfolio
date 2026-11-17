import slide01 from "../assets/eat!/presentation/slide-01.png";
import slide02 from "../assets/eat!/presentation/slide-02.png";
import slide03 from "../assets/eat!/presentation/slide-03.png";
import slide04 from "../assets/eat!/presentation/slide-04.png";
import slide05 from "../assets/eat!/presentation/slide-05.png";
import slide06 from "../assets/eat!/presentation/slide-06.png";
import slide07 from "../assets/eat!/presentation/slide-07.png";
import slide08 from "../assets/eat!/presentation/slide-08.png";
import slide09 from "../assets/eat!/presentation/slide-09.png";
import slide10 from "../assets/eat!/presentation/slide-10.png";
import slide11 from "../assets/eat!/presentation/slide-11.png";
import slide13 from "../assets/eat!/presentation/slide-13.png";
import slide14 from "../assets/eat!/presentation/slide-14.png";
import slide15 from "../assets/eat!/presentation/slide-15.png";
import slide16 from "../assets/eat!/presentation/slide-16.png";
import slide17 from "../assets/eat!/presentation/slide-17.png";
import slide18 from "../assets/eat!/presentation/slide-18.png";

const slides = [
  {
    src: slide01,
    title: "eat!",
    alt: "eat! presentation by Chris, Caroline, and Eamonn, with an illustration of a hand holding a phone.",
  },
  {
    src: slide02,
    title: "Our Journey",
    alt: "Four phases: Exploration, exploring possible needs; Ideation, considering solutions; Development, creating a human story; and Deliverable, crafting an experience.",
  },
  {
    src: slide03,
    title: "Research",
    alt: "Research progresses from exploratory interviews about the food experience, to targeted interviews about the restaurant experience, a generative tool about factors determining restaurant choice, and concept feedback about the idea.",
  },
  {
    src: slide04,
    title: "Key Insights",
    alt: "Social situations change the restaurant experience people want. People rarely leave reviews, and do so in extreme cases. People prefer recommendations from friends and enjoy giving them; searching the internet can be overwhelming.",
  },
  {
    src: slide05,
    title: "Who we are",
    alt: "Objectives: provide an immersive, accurate experience to find a restaurant for a social scenario; reduce choice overload through recommendation-based search; and remove bias from polarized online restaurant reviews.",
  },
  {
    src: slide06,
    title: "Who we want",
    alt: "The stakeholder sees food as experience, community, fun, exploration, and worldview. Illustrations show friends eating together rather than rushing through a meal.",
  },
  {
    src: slide07,
    title: "Foundations",
    alt: "Social media combines sharing emotions and experiences, social networks, personally relatable posts, and fun. A review site adds feedback for restaurants and people, scouting venues before entering, exploring new experiences, and function.",
  },
  {
    src: slide08,
    title: "Concept Map",
    alt: "Restaurant goers seek new restaurants that fit their social scenario without indecision, biased online reviews, or uncertainty from never having visited. The map connects these needs to recommendations from friends found on eat!.",
  },
  {
    src: slide09,
    title: "Concept Sketch",
    alt: "The concept connects restaurants and their food-experience aura with restaurant goers. Sketches explore how to capture an atmosphere and communicate that experience to others.",
  },
  {
    src: slide10,
    title: "Storyboard",
    alt: "A sequence of illustrated panels follows friends planning a meal, using eat! on a phone to explore restaurants and their atmosphere, and choosing a place to dine together.",
  },
  {
    src: slide11,
    title: "Customer Journey Map",
    alt: "The journey covers choosing a restaurant amid indecision, dining and recording audio and video for its aura, and sharing to help others discover it. Emotions include overwhelmed, curious, amazed, and reluctant. Needs include customization, accuracy, sharing, and incentives; opportunities include filters, immersive VR, a social feed, and rewards.",
  },
  {
    src: slide13,
    title: "Key Features",
    alt: "Connect: explore restaurants from your social network. Discover: find restaurants on an interactive map. Immerse: experience VR sound and visuals replicating atmosphere. Customize: filter by mood, occasion, and time.",
  },
  {
    src: slide14,
    title: "User Flow",
    alt: "Restaurant goers immerse in auras using VR customized to day and time. Auras combine decor and light from phone video with music and conversation from ambient recordings. Friends post auras on the social feed, like and comment, and share restaurants. Restaurants can be discovered on the feed, map, or search, filtered by social situation, mood, and popularity, then saved in foodlists. Profiles show past experiences.",
  },
  {
    src: slide15,
    title: "Home Page: The Feed",
    alt: "Phone mockups show the home feed and an immersive restaurant view. The app opens on a social feed, prioritizing friends' experiences for more personal recommendations.",
  },
  {
    src: slide16,
    title: "Aura Page",
    alt: "Two phone mockups show an aura's mood visualization and analysis. Mood appears first, followed by temperature, noise level, service quality, and conversation. Insights are shared with the user and their friends.",
  },
  {
    src: slide17,
    title: "Profile Page",
    alt: "A phone mockup shows a profile with a progress bar for reward and achievement, recent aura posts, and food lists formatted like playlists for a contemporary, emotive interpretation.",
  },
  {
    src: slide18,
    title: "App screens",
    alt: "Three phone mockups show eat!'s social feed, restaurant aura analysis, and profile with recent auras and playlist-style food lists.",
  },
];

export const eatPresentationSlides = slides.map(
  ({ title, ...slide }, index) => ({
    ...slide,
    caption: `${index + 1} / ${slides.length} - ${title}`,
  }),
);
