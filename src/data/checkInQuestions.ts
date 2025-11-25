// PHQ-9 Questions (Depression Screening) - Gamified
export const phq9Questions = [
    {
        id: 'phq9_1',
        clinical: 'Little interest or pleasure in doing things',
        gamified: 'How much sparkle did your favorite activities have today?',
        type: 'happiness',
    },
    {
        id: 'phq9_2',
        clinical: 'Feeling down, depressed, or hopeless',
        gamified: 'Did any clouds dim your inner light today?',
        type: 'health',
    },
    {
        id: 'phq9_3',
        clinical: 'Trouble falling or staying asleep, or sleeping too much',
        gamified: 'How peaceful was your rest in the dream realm?',
        type: 'energy',
    },
    {
        id: 'phq9_4',
        clinical: 'Feeling tired or having little energy',
        gamified: 'How full is your energy crystal today?',
        type: 'energy',
    },
    {
        id: 'phq9_5',
        clinical: 'Poor appetite or overeating',
        gamified: 'Did you nourish your garden well today?',
        type: 'health',
    },
];

// GAD-7 Questions (Anxiety Screening) - Gamified
export const gad7Questions = [
    {
        id: 'gad7_1',
        clinical: 'Feeling nervous, anxious, or on edge',
        gamified: 'Did the Worry Butterflies visit you today?',
        type: 'health',
    },
    {
        id: 'gad7_2',
        clinical: 'Not being able to stop or control worrying',
        gamified: 'Could you calm the Storm Clouds in your mind?',
        type: 'wisdom',
    },
    {
        id: 'gad7_3',
        clinical: 'Worrying too much about different things',
        gamified: 'How many thought-tangles did you untangle today?',
        type: 'wisdom',
    },
];

// Response options (0-3 scale for PHQ-9/GAD-7)
export const responseOptions = [
    { value: 3, label: 'Bright & Clear', emoji: '✨', color: 'nature' },
    { value: 2, label: 'Mostly Sunny', emoji: '🌤️', color: 'warm' },
    { value: 1, label: 'A Bit Cloudy', emoji: '⛅', color: 'sanctuary' },
    { value: 0, label: 'Stormy', emoji: '🌧️', color: 'bloom' },
];

export type QuestionType = 'health' | 'happiness' | 'wisdom' | 'energy';

export const calculateImpact = (responses: Record<string, number>) => {
    const impact = {
        health: 0,
        happiness: 0,
        wisdom: 0,
        energy: 0,
    };

    const allQuestions = [...phq9Questions, ...gad7Questions];

    Object.entries(responses).forEach(([id, value]) => {
        const question = allQuestions.find((q) => q.id === id);
        if (question) {
            // Higher response value = better state
            // Convert to 0-100 scale and add to appropriate stat
            const statIncrease = (value / 3) * 25; // Max 25 per question
            impact[question.type as QuestionType] += statIncrease;
        }
    });

    return impact;
};
