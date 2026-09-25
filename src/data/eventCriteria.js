const EVENT_CRITERIA = {
  "Solo Song": [
    { name: "Voice Quality", maxMarks: 25 },
    { name: "Pitch & Rhythm", maxMarks: 20 },
    { name: "Expression & Emotion", maxMarks: 20 },
    { name: "Song Selection", maxMarks: 10 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Pronunciation", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 10 },
  ],

  "Solo Dance": [
    { name: "Technique & Execution", maxMarks: 25 },
    { name: "Rhythm & Coordination", maxMarks: 20 },
    { name: "Expression", maxMarks: 15 },
    { name: "Choreography", maxMarks: 15 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Overall Performance", maxMarks: 5 },
  ],

  "Group Dance": [
    { name: "Synchronization", maxMarks: 25 },
    { name: "Choreography", maxMarks: 20 },
    { name: "Coordination", maxMarks: 15 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Music & Rhythm", maxMarks: 5 },
    { name: "Team Performance", maxMarks: 5 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "Instrumental Music": [
    { name: "Technical Skill", maxMarks: 25 },
    { name: "Rhythm & Timing", maxMarks: 20 },
    { name: "Musical Expression", maxMarks: 20 },
    { name: "Accuracy", maxMarks: 15 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Stage Presentation", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 5 },
  ],

  "Mime": [
    { name: "Expression & Acting", maxMarks: 20 },
    { name: "Storytelling", maxMarks: 20 },
    { name: "Team Coordination", maxMarks: 15 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Message / Theme", maxMarks: 15 },
    { name: "Use of Music & Props", maxMarks: 5 },
    { name: "Stage Presentation", maxMarks: 5 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Mono Act": [
    { name: "Acting Skill", maxMarks: 25 },
    { name: "Characterization", maxMarks: 20 },
    { name: "Voice Modulation", maxMarks: 15 },
    { name: "Expression", maxMarks: 15 },
    { name: "Storytelling", maxMarks: 10 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Stage Presence", maxMarks: 5 },
  ],

  "Fashion Parade": [
    { name: "Theme Interpretation", maxMarks: 20 },
    { name: "Costume & Styling", maxMarks: 20 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Presentation", maxMarks: 15 },
    { name: "Confidence", maxMarks: 10 },
    { name: "Team Coordination", maxMarks: 5 },
    { name: "Walk / Stage Presence", maxMarks: 10 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Mr. & Ms. Fest": [
    { name: "Confidence", maxMarks: 20 },
    { name: "Communication Skills", maxMarks: 15 },
    { name: "Personality", maxMarks: 15 },
    { name: "Talent Performance", maxMarks: 15 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Question & Answer", maxMarks: 15 },
    { name: "Grooming & Presentation", maxMarks: 5 },
    { name: "Overall Impression", maxMarks: 5 },
  ],

  "Pencil Sketching": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Drawing Skill", maxMarks: 20 },
    { name: "Accuracy & Detailing", maxMarks: 15 },
    { name: "Composition", maxMarks: 15 },
    { name: "Theme Interpretation", maxMarks: 15 },
    { name: "Shading & Technique", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "Photography": [
    { name: "Composition", maxMarks: 20 },
    { name: "Creativity", maxMarks: 20 },
    { name: "Theme Interpretation", maxMarks: 15 },
    { name: "Technical Quality", maxMarks: 15 },
    { name: "Originality", maxMarks: 15 },
    { name: "Visual Impact", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "Bridal Makeup": [
    { name: "Makeup Technique", maxMarks: 20 },
    { name: "Theme Interpretation", maxMarks: 20 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Blending & Finishing", maxMarks: 15 },
    { name: "Colour Coordination", maxMarks: 10 },
    { name: "Overall Appearance", maxMarks: 10 },
    { name: "Hygiene & Presentation", maxMarks: 10 },
  ],

  "Mehendi": [
    { name: "Design Creativity", maxMarks: 20 },
    { name: "Precision", maxMarks: 20 },
    { name: "Neatness", maxMarks: 15 },
    { name: "Pattern & Detailing", maxMarks: 15 },
    { name: "Theme Interpretation", maxMarks: 10 },
    { name: "Time Management", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 10 },
  ],

  "Chill Chef": [
    { name: "Taste", maxMarks: 25 },
    { name: "Presentation", maxMarks: 20 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Nutrition", maxMarks: 15 },
    { name: "Hygiene", maxMarks: 10 },
    { name: "Ingredient Combination", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "RJ Hunt": [
    { name: "Voice Quality", maxMarks: 20 },
    { name: "Communication", maxMarks: 20 },
    { name: "Confidence", maxMarks: 15 },
    { name: "Situation Handling", maxMarks: 15 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Announcement / Ad Skill", maxMarks: 10 },
    { name: "Rapid Fire", maxMarks: 10 },
  ],

  "Street Play": [
    { name: "Acting", maxMarks: 20 },
    { name: "Social Message", maxMarks: 20 },
    { name: "Team Coordination", maxMarks: 15 },
    { name: "Storytelling", maxMarks: 15 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Audience Engagement", maxMarks: 10 },
    { name: "Use of Space / Props", maxMarks: 5 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Wealth Out of Waste": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Use of Waste Materials", maxMarks: 20 },
    { name: "Utility", maxMarks: 15 },
    { name: "Originality", maxMarks: 15 },
    { name: "Environmental Value", maxMarks: 10 },
    { name: "Craftsmanship", maxMarks: 10 },
    { name: "Presentation", maxMarks: 10 },
  ],

  "Technical Quiz": [
    { name: "Technical Knowledge", maxMarks: 30 },
    { name: "Accuracy", maxMarks: 25 },
    { name: "Problem Solving", maxMarks: 15 },
    { name: "Speed", maxMarks: 10 },
    { name: "Conceptual Understanding", maxMarks: 10 },
    { name: "Final Round Performance", maxMarks: 10 },
  ],

  "Web Design": [
    { name: "Functionality", maxMarks: 25 },
    { name: "UI/UX Design", maxMarks: 20 },
    { name: "Technical Implementation", maxMarks: 20 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Responsiveness", maxMarks: 10 },
    { name: "Code Quality", maxMarks: 5 },
    { name: "Presentation", maxMarks: 5 },
  ],

  "Coding Challenge": [
    { name: "Correctness", maxMarks: 30 },
    { name: "Algorithm & Logic", maxMarks: 20 },
    { name: "Problem Solving", maxMarks: 15 },
    { name: "Code Quality", maxMarks: 10 },
    { name: "Efficiency", maxMarks: 10 },
    { name: "Edge Case Handling", maxMarks: 10 },
    { name: "Code Explanation", maxMarks: 5 },
  ],

  "Hackathon": [
    { name: "Problem Understanding", maxMarks: 15 },
    { name: "Innovation", maxMarks: 20 },
    { name: "Technical Implementation", maxMarks: 20 },
    { name: "Functionality", maxMarks: 15 },
    { name: "UI/UX", maxMarks: 10 },
    { name: "Scalability", maxMarks: 5 },
    { name: "Presentation", maxMarks: 10 },
    { name: "Impact", maxMarks: 5 },
  ],

  "Ideathon": [
    { name: "Problem Identification", maxMarks: 15 },
    { name: "Innovation", maxMarks: 20 },
    { name: "Feasibility", maxMarks: 15 },
    { name: "Solution Quality", maxMarks: 15 },
    { name: "Social / Industrial Relevance", maxMarks: 10 },
    { name: "Business / Implementation", maxMarks: 10 },
    { name: "Presentation", maxMarks: 10 },
    { name: "Q&A", maxMarks: 5 },
  ],

  "Digital Designing": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Design Quality", maxMarks: 20 },
    { name: "Theme Interpretation", maxMarks: 15 },
    { name: "Visual Composition", maxMarks: 15 },
    { name: "Technical Skill", maxMarks: 10 },
    { name: "Originality", maxMarks: 10 },
    { name: "Presentation", maxMarks: 10 },
  ],

  "Drone Challenge": [
    { name: "Flight Control", maxMarks: 25 },
    { name: "Technical Execution", maxMarks: 20 },
    { name: "Accuracy", maxMarks: 20 },
    { name: "Task Completion", maxMarks: 15 },
    { name: "Safety Compliance", maxMarks: 10 },
    { name: "Team Coordination", maxMarks: 5 },
    { name: "Innovation", maxMarks: 5 },
  ],

  "Best Manager": [
    { name: "Aptitude", maxMarks: 15 },
    { name: "Case Study Analysis", maxMarks: 20 },
    { name: "Decision Making", maxMarks: 20 },
    { name: "Business Situation Handling", maxMarks: 15 },
    { name: "Communication", maxMarks: 10 },
    { name: "Leadership", maxMarks: 10 },
    { name: "Personal Interview", maxMarks: 10 },
  ],

  "Commerce Dumb Charades": [
    { name: "Acting & Expression", maxMarks: 20 },
    { name: "Knowledge of Terms", maxMarks: 20 },
    { name: "Team Coordination", maxMarks: 20 },
    { name: "Speed", maxMarks: 15 },
    { name: "Accuracy", maxMarks: 15 },
    { name: "Creativity", maxMarks: 10 },
  ],

  "Vyaapaar Vision": [
    { name: "Business Strategy", maxMarks: 20 },
    { name: "Problem Understanding", maxMarks: 15 },
    { name: "Innovation", maxMarks: 15 },
    { name: "Marketing Strategy", maxMarks: 10 },
    { name: "Financial Planning", maxMarks: 10 },
    { name: "Operations Strategy", maxMarks: 10 },
    { name: "Growth Potential", maxMarks: 10 },
    { name: "Presentation & Q&A", maxMarks: 10 },
  ],

  "Brand Blitz": [
    { name: "Brand Knowledge", maxMarks: 25 },
    { name: "Accuracy", maxMarks: 20 },
    { name: "Marketing Understanding", maxMarks: 15 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Speed", maxMarks: 10 },
    { name: "Team Coordination", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 10 },
  ],

  "Logo Designing": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Originality", maxMarks: 20 },
    { name: "Theme Relevance", maxMarks: 15 },
    { name: "Visual Design", maxMarks: 15 },
    { name: "Brand Communication", maxMarks: 15 },
    { name: "Technical Execution", maxMarks: 10 },
    { name: "Concept Explanation", maxMarks: 5 },
  ],

  "Ad Zap": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Acting & Presentation", maxMarks: 20 },
    { name: "Product Understanding", maxMarks: 15 },
    { name: "Humour & Engagement", maxMarks: 15 },
    { name: "Team Coordination", maxMarks: 10 },
    { name: "Advertisement Quality", maxMarks: 10 },
    { name: "Spontaneity", maxMarks: 10 },
  ],

  "IPL Auction": [
    { name: "Auction Strategy", maxMarks: 25 },
    { name: "Budget Management", maxMarks: 20 },
    { name: "Player Selection", maxMarks: 20 },
    { name: "Team Composition", maxMarks: 15 },
    { name: "Decision Making", maxMarks: 10 },
    { name: "Knowledge of Players", maxMarks: 5 },
    { name: "Overall Strategy", maxMarks: 5 },
  ],

  "Meme Creation": [
    { name: "Creativity", maxMarks: 25 },
    { name: "Humour", maxMarks: 20 },
    { name: "Theme Relevance", maxMarks: 15 },
    { name: "Originality", maxMarks: 15 },
    { name: "Visual Quality", maxMarks: 10 },
    { name: "Timing", maxMarks: 5 },
    { name: "Overall Impact", maxMarks: 10 },
  ],

  "Reels Challenge": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Content Quality", maxMarks: 20 },
    { name: "Storytelling", maxMarks: 15 },
    { name: "Entertainment Value", maxMarks: 15 },
    { name: "Video Quality", maxMarks: 10 },
    { name: "Originality", maxMarks: 10 },
    { name: "Theme Relevance", maxMarks: 5 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Rapid Fire": [
    { name: "Accuracy", maxMarks: 30 },
    { name: "Speed", maxMarks: 20 },
    { name: "General Knowledge", maxMarks: 15 },
    { name: "Communication", maxMarks: 10 },
    { name: "Confidence", maxMarks: 10 },
    { name: "Current Affairs", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 10 },
  ],

  "Freeze Dance": [
    { name: "Rhythm & Dancing", maxMarks: 25 },
    { name: "Timing", maxMarks: 20 },
    { name: "Reaction Speed", maxMarks: 20 },
    { name: "Energy", maxMarks: 15 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Stage Presence", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 5 },
  ],

  "Guess the Song": [
    { name: "Accuracy", maxMarks: 35 },
    { name: "Speed", maxMarks: 20 },
    { name: "Music Knowledge", maxMarks: 15 },
    { name: "Language / Genre Recognition", maxMarks: 10 },
    { name: "Consistency", maxMarks: 10 },
    { name: "Tie-Breaker Performance", maxMarks: 10 },
  ],
};

export default EVENT_CRITERIA;