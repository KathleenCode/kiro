class StoryApp {
    constructor() {
        this.currentStory = null;
        this.currentParagraphIndex = 0;
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.vocabularyWords = [];
        this.quizQuestions = [];
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.themeInput = document.getElementById('theme-input');
        this.generateBtn = document.getElementById('generate-story-btn');
        
        // Debug: Check if input element is found
        console.log('Theme input element:', this.themeInput);
        if (this.themeInput) {
            console.log('Input element found successfully');
            // Ensure input is focusable
            this.themeInput.setAttribute('tabindex', '0');
        } else {
            console.error('Theme input element not found!');
        }
        this.storyTitle = document.getElementById('story-title');
        this.storyText = document.getElementById('story-text');
        this.vocabCard = document.getElementById('vocabulary-card');
        this.vocabWord = document.getElementById('vocab-word');
        this.vocabDefinition = document.getElementById('vocab-definition');
        this.continueBtn = document.getElementById('continue-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.questionText = document.getElementById('question-text');
        this.answerOptions = document.getElementById('answer-options');
        this.quizResults = document.getElementById('quiz-results');
        this.scoreText = document.getElementById('score-text');
        this.newStoryBtn = document.getElementById('new-story-btn');
        
        this.sections = {
            theme: document.getElementById('theme-section'),
            story: document.getElementById('story-section'),
            quiz: document.getElementById('quiz-section')
        };
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateStory());
        this.themeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generateStory();
        });
        
        // Add input event for debugging
        this.themeInput.addEventListener('input', (e) => {
            console.log('Input value changed:', e.target.value);
        });
        
        // Add click event to ensure focus
        this.themeInput.addEventListener('click', () => {
            console.log('Input clicked');
            this.themeInput.focus();
        });
        
        this.continueBtn.addEventListener('click', () => this.continueReading());
        this.restartBtn.addEventListener('click', () => this.showSection('theme'));
        this.newStoryBtn.addEventListener('click', () => this.showSection('theme'));
    }

    showSection(sectionName) {
        Object.values(this.sections).forEach(section => {
            section.classList.remove('active');
        });
        this.sections[sectionName].classList.add('active');
    }

    generateStory() {
        const theme = this.themeInput.value.trim();
        console.log('Theme entered:', theme); // Debug log
        if (!theme) {
            alert('Please enter a theme for your story!');
            return;
        }

        this.currentStory = this.createStoryFromTheme(theme);
        this.currentParagraphIndex = 0;
        this.vocabularyWords = this.extractVocabulary(this.currentStory);
        this.quizQuestions = this.generateQuizQuestions(theme, this.currentStory);
        
        this.displayStoryTitle();
        this.displayCurrentParagraph();
        this.showSection('story');
    }

    createStoryFromTheme(theme) {
        const storyTemplates = {
            friendship: {
                title: "The Unlikely Friends",
                paragraphs: [
                    "In a bustling meadow filled with wildflowers, lived Maya, a timid rabbit who preferred solitude. She spent her days reading beneath the ancient oak tree, avoiding the boisterous games of other woodland creatures.",
                    "One autumn morning, Maya encountered Zara, a gregarious fox with a reputation for mischief. Despite their natural differences, Zara approached Maya with genuine curiosity about her beloved books.",
                    "Initially apprehensive, Maya gradually discovered that Zara possessed remarkable empathy and intelligence. Their conversations about literature blossomed into a profound friendship that transcended species boundaries.",
                    "When winter arrived with unprecedented severity, Maya and Zara collaborated to help struggling animals in their community. Their partnership demonstrated that authentic friendship conquers all prejudices and fears."
                ]
            },
            courage: {
                title: "The Brave Little Lighthouse Keeper",
                paragraphs: [
                    "On a remote island stood an ancient lighthouse tended by Samuel, a young keeper who had inherited the responsibility from his grandfather. The lighthouse had guided countless vessels through treacherous waters for generations.",
                    "During a catastrophic storm, Samuel noticed the lighthouse's beacon flickering ominously. The electrical system had malfunctioned, leaving ships vulnerable to the jagged rocks surrounding the island.",
                    "Despite his trepidation and the perilous conditions, Samuel courageously climbed the lighthouse's exterior during the tempest. He manually operated the beacon using emergency procedures his grandfather had taught him.",
                    "Samuel's valiant efforts throughout the night saved seventeen ships and hundreds of lives. His selfless bravery became legendary, inspiring future generations of lighthouse keepers to uphold their sacred duty."
                ]
            },
            kindness: {
                title: "The Magic of Small Acts",
                paragraphs: [
                    "Elena worked at a modest bakery in a neighborhood where many families struggled financially. She noticed how children would longingly gaze at the pastries they couldn't afford, their faces reflecting disappointment.",
                    "Secretly, Elena began preparing extra bread and cookies each morning. She would discretely offer these treats to hungry children and elderly customers who counted every penny carefully.",
                    "Word of Elena's benevolence spread throughout the community, inspiring others to contribute. Neighbors began donating ingredients, and customers started paying for strangers' purchases anonymously.",
                    "The bakery transformed into a beacon of compassion where kindness multiplied exponentially. Elena learned that small acts of generosity create ripples of goodness that extend far beyond imagination."
                ]
            }
        };

        // Default story structure for any theme
        const defaultStory = {
            title: `The Tale of ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
            paragraphs: [
                `In a world where ${theme} was rare, there lived a character who would change everything. This individual possessed qualities that others had forgotten existed in their busy lives.`,
                `Through various challenges and encounters, our protagonist discovered the true meaning of ${theme}. Each obstacle became an opportunity to demonstrate values that seemed lost in modern times.`,
                `The character's actions began influencing others in unexpected ways. What started as individual choices created a movement that spread throughout their community like ripples in a pond.`,
                `In the end, the story revealed that ${theme} has the power to transform not just individuals, but entire societies. The moral lesson became clear: every person has the capacity to make a meaningful difference.`
            ]
        };

        return storyTemplates[theme.toLowerCase()] || defaultStory;
    }

    extractVocabulary(story) {
        const vocabularyBank = {
            'bustling': 'Full of activity and energy; busy and lively',
            'solitude': 'The state of being alone, especially when peaceful',
            'boisterous': 'Noisy, energetic, and cheerful in a rough way',
            'gregarious': 'Fond of company; sociable and outgoing',
            'apprehensive': 'Anxious or fearful about something that might happen',
            'empathy': 'The ability to understand and share others\' feelings',
            'transcended': 'Went beyond the usual limits of something',
            'unprecedented': 'Never done or known before; extraordinary',
            'collaborated': 'Worked jointly with others on an activity',
            'authentic': 'Genuine and real; not false or copied',
            'treacherous': 'Dangerous and unpredictable; hazardous',
            'ominously': 'In a way that suggests something bad will happen',
            'catastrophic': 'Involving sudden great damage or suffering',
            'trepidation': 'A feeling of fear or anxiety about something',
            'perilous': 'Full of danger or risk; hazardous',
            'valiant': 'Showing courage and determination; brave',
            'selfless': 'Concerned more with others\' needs than one\'s own',
            'benevolence': 'The quality of being well-meaning and kindly',
            'discretely': 'Carefully and without drawing attention',
            'exponentially': 'At a rapidly increasing rate',
            'beacon': 'A source of light or inspiration; a guiding signal'
        };

        const words = [];
        story.paragraphs.forEach((paragraph, index) => {
            const paragraphWords = paragraph.toLowerCase().match(/\b\w+\b/g) || [];
            const foundWords = paragraphWords.filter(word => vocabularyBank[word]);
            
            if (foundWords.length > 0) {
                const selectedWord = foundWords[0];
                words.push({
                    paragraphIndex: index,
                    word: selectedWord,
                    definition: vocabularyBank[selectedWord]
                });
            }
        });

        return words;
    }

    generateQuizQuestions(theme, story) {
        const questions = [
            {
                question: "What is the main moral lesson of this story?",
                options: [
                    `The importance of ${theme} in building strong relationships`,
                    "Money is the most important thing in life",
                    "It's better to work alone than with others",
                    "Avoiding challenges leads to success"
                ],
                correct: 0
            },
            {
                question: "How did the main character demonstrate growth?",
                options: [
                    "By avoiding difficult situations",
                    "By learning to value material possessions",
                    "By overcoming personal challenges and helping others",
                    "By becoming more selfish over time"
                ],
                correct: 2
            },
            {
                question: "What can we learn about community from this story?",
                options: [
                    "Communities are not important for personal growth",
                    "Individual actions can positively impact entire communities",
                    "It's best to avoid getting involved with neighbors",
                    "Communities should only help wealthy members"
                ],
                correct: 1
            }
        ];

        return questions;
    }

    displayStoryTitle() {
        this.storyTitle.textContent = this.currentStory.title;
    }

    displayCurrentParagraph() {
        const paragraph = this.currentStory.paragraphs[this.currentParagraphIndex];
        const paragraphDiv = document.createElement('div');
        paragraphDiv.className = 'story-paragraph';
        paragraphDiv.textContent = paragraph;
        
        this.storyText.appendChild(paragraphDiv);
        
        // Check if there's a vocabulary word for this paragraph
        const vocabWord = this.vocabularyWords.find(
            word => word.paragraphIndex === this.currentParagraphIndex
        );
        
        if (vocabWord) {
            this.showVocabularyCard(vocabWord);
        } else {
            this.checkStoryCompletion();
        }
    }

    showVocabularyCard(vocabWord) {
        this.vocabWord.textContent = vocabWord.word;
        this.vocabDefinition.textContent = vocabWord.definition;
        this.vocabCard.classList.remove('hidden');
    }

    continueReading() {
        this.vocabCard.classList.add('hidden');
        this.currentParagraphIndex++;
        this.checkStoryCompletion();
    }

    checkStoryCompletion() {
        if (this.currentParagraphIndex < this.currentStory.paragraphs.length) {
            setTimeout(() => this.displayCurrentParagraph(), 500);
        } else {
            setTimeout(() => this.startQuiz(), 1000);
        }
    }

    startQuiz() {
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.showSection('quiz');
        this.displayCurrentQuestion();
    }

    displayCurrentQuestion() {
        if (this.currentQuizIndex >= this.quizQuestions.length) {
            this.showQuizResults();
            return;
        }

        const question = this.quizQuestions[this.currentQuizIndex];
        this.questionText.textContent = `Question ${this.currentQuizIndex + 1}: ${question.question}`;
        
        this.answerOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => this.selectAnswer(index));
            this.answerOptions.appendChild(optionDiv);
        });
    }

    selectAnswer(selectedIndex) {
        const question = this.quizQuestions[this.currentQuizIndex];
        const options = this.answerOptions.querySelectorAll('.answer-option');
        
        options.forEach((option, index) => {
            option.style.pointerEvents = 'none';
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        if (selectedIndex === question.correct) {
            this.quizScore++;
        }

        setTimeout(() => {
            this.currentQuizIndex++;
            this.displayCurrentQuestion();
        }, 2000);
    }

    showQuizResults() {
        const percentage = Math.round((this.quizScore / this.quizQuestions.length) * 100);
        this.scoreText.textContent = `You scored ${this.quizScore} out of ${this.quizQuestions.length} (${percentage}%)`;
        
        document.getElementById('question-container').classList.add('hidden');
        this.quizResults.classList.remove('hidden');
    }


}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new StoryApp();
});