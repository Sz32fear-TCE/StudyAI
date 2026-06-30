(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('StudyAI must run unsandboxed to fetch external master datasets.');
  }

  class StudyAI {
    constructor() {
      this.dataset = null;
      this.datasetUrl = 'https://sz32fear-tce.github.io/StudyAI/us_curriculum_master_dataset.json';
      this._fetchDataset();
    }

    getInfo() {
      return {
        id: 'studyai',
        name: 'StudyAI',
        color1: '#4A90E2',
        color2: '#357ABD',
        blocks: [
          // --- Vanilla Local Multi-Generation Blocks ---
          {
            opcode: 'generateSummaryVanilla',
            blockType: Scratch.BlockType.REPORTER,
            text: 'generate summary from raw notes [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Kinematics is a subfield of physics that describes the motion of points without considering forces. Key variables tracked include displacement, velocity, acceleration, and time elapsed.'
              }
            }
          },
          {
            opcode: 'getGeneratedFlashcardCount',
            blockType: Scratch.BlockType.REPORTER,
            text: 'count of local flashcards from raw notes [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Kinematics is a subfield of physics that describes motion. Velocity is the rate of change of displacement. Acceleration tracks changing velocity.'
              }
            }
          },
          {
            opcode: 'getGeneratedFlashcardSide',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get local flashcard [INDEX] [SIDE] from raw notes [TEXT]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              SIDE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'flashcardSides',
                defaultValue: 'question'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Kinematics is a subfield of physics that describes motion. Velocity is the rate of change of displacement. Acceleration tracks changing velocity.'
              }
            }
          },
          {
            opcode: 'getGeneratedQuizCount',
            blockType: Scratch.BlockType.REPORTER,
            text: 'count of local quiz questions from raw notes [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Kinematics is a subfield of physics that describes motion. Velocity is the rate of change of displacement. Acceleration tracks changing velocity.'
              }
            }
          },
          {
            opcode: 'getGeneratedQuizQuestion',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get local quiz question [INDEX] from raw notes [TEXT]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Kinematics is a subfield of physics that describes motion. Velocity is the rate of change of displacement. Acceleration tracks changing velocity.'
              }
            }
          },
          {
            opcode: 'getGeneratedQuizChoice',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get local quiz question [INDEX] choice [CHOICE] from raw notes [TEXT]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              CHOICE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'choicesMenu',
                defaultValue: 'A'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Kinematics is a subfield of physics that describes motion. Velocity is the rate of change of displacement. Acceleration tracks changing velocity.'
              }
            }
          },
          {
            opcode: 'getGeneratedQuizAnswer',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get local correct answer for quiz question [INDEX] from raw notes [TEXT]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Kinematics is a subfield of physics that describes motion. Velocity is the rate of change of displacement. Acceleration tracks changing velocity.'
              }
            }
          },
          '---',
          // --- Existing Dataset Blocks ---
          {
            opcode: 'summarizeRawNotes',
            blockType: Scratch.BlockType.REPORTER,
            text: 'summarize raw notes [TEXT] into [COUNT] sentences',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Lecture Notes - Important! Study of heredity. Gregor Mendel discovered dominant and recessive traits using pea plants. Punnett squares predict genotype outcomes. Professor emphasized this heavily.'
              },
              COUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },
          {
            opcode: 'fetchData',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reload master dataset'
          },
          {
            opcode: 'isLoaded',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is dataset loaded?'
          },
          {
            opcode: 'getTopics',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get list of topics/subjects'
          },
          {
            opcode: 'getSummary',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get summary for topic [TOPIC]',
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Physics'
              }
            }
          },
          {
            opcode: 'getFlashcardCount',
            blockType: Scratch.BlockType.REPORTER,
            text: 'count of flashcards for [TOPIC]',
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Physics'
              }
            }
          },
          {
            opcode: 'getFlashcardSide',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get flashcard [INDEX] [SIDE] for [TOPIC]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              SIDE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'flashcardSides',
                defaultValue: 'question'
              },
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Physics'
              }
            }
          },
          {
            opcode: 'getTestCount',
            blockType: Scratch.BlockType.REPORTER,
            text: 'count of test questions for [TOPIC]',
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Physics'
              }
            }
          },
          {
            opcode: 'getTestQuestion',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get test question [INDEX] for [TOPIC]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Physics'
              }
            }
          },
          {
            opcode: 'getTestChoice',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get test question [INDEX] choice [CHOICE] for [TOPIC]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              CHOICE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'choicesMenu',
                defaultValue: 'A'
              },
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Physics'
              }
            }
          },
          {
            opcode: 'getTestAnswer',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get correct answer for question [INDEX] for [TOPIC]',
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Physics'
              }
            }
          }
        ],
        menus: {
          flashcardSides: {
            acceptReporters: true,
            items: ['question', 'answer']
          },
          choicesMenu: {
            acceptReporters: true,
            items: ['A', 'B', 'C', 'D']
          }
        }
      };
    }

    // --- Core Local Generation Engine ---

    generateSummaryVanilla(args) {
      const text = args.TEXT || '';
      if (!text) return 'No notes provided.';
      return this.summarizeRawNotes({ TEXT: text, COUNT: 1 });
    }

    // internal generator that breaks notes up sentence by sentence into flashcard objects
    _buildLocalFlashcards(text) {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      const items = [];

      sentences.forEach(sentence => {
        const cleanSentence = sentence.trim();
        if (cleanSentence.length < 5) return;

        if (cleanSentence.toLowerCase().includes(' is ')) {
          const parts = cleanSentence.split(/\bis\b/i);
          const term = parts[0].trim();
          const definition = parts.slice(1).join(' is ').trim();
          items.push({ question: `What is ${term}?`, answer: definition });
        } else {
          items.push({ question: 'Key Point:', answer: cleanSentence });
        }
      });
      return items;
    }

    // internal generator that turns concept sentences into dynamic True/False questions
    _buildLocalQuizzes(text) {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      const items = [];

      sentences.forEach(sentence => {
        const cleanSentence = sentence.trim();
        if (cleanSentence.length < 5) return;

        if (cleanSentence.toLowerCase().includes(' is ')) {
          const parts = cleanSentence.split(/\bis\b/i);
          const term = parts[0].trim();
          const definition = parts.slice(1).join(' is ').trim();
          items.push({
            question: `True or False: ${term} is defined as: ${definition}`,
            choices: { A: 'True', B: 'False', C: 'Neither', D: 'Unknown' },
            answer: 'A'
          });
        } else {
          items.push({
            question: `Is the following statement completely accurate? "${cleanSentence}"`,
            choices: { A: 'Yes', B: 'No', C: 'Partially', D: 'Unsure' },
            answer: 'A'
          });
        }
      });
      return items;
    }

    getGeneratedFlashcardCount(args) {
      return this._buildLocalFlashcards(args.TEXT || '').length;
    }

    getGeneratedFlashcardSide(args) {
      const list = this._buildLocalFlashcards(args.TEXT || '');
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return args.SIDE.toLowerCase() === 'question' ? list[idx].question : list[idx].answer;
    }

    getGeneratedQuizCount(args) {
      return this._buildLocalQuizzes(args.TEXT || '').length;
    }

    getGeneratedQuizQuestion(args) {
      const list = this._buildLocalQuizzes(args.TEXT || '');
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return list[idx].question;
    }

    getGeneratedQuizChoice(args) {
      const list = this._buildLocalQuizzes(args.TEXT || '');
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return list[idx].choices?.[args.CHOICE.toUpperCase()] || '';
    }

    getGeneratedQuizAnswer(args) {
      const list = this._buildLocalQuizzes(args.TEXT || '');
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return list[idx].answer;
    }

    // --- Core Algorithmic Dataset Engine ---
    summarizeRawNotes(args) {
      const text = args.TEXT || '';
      const targetCount = Math.max(1, Math.floor(args.COUNT || 2));
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      if (sentences.length <= targetCount) return text;
      const stopWords = new Set(['the', 'a', 'and', 'is', 'of', 'in', 'to', 'it', 'that', 'this', 'for', 'on', 'with', 'as']);
      const wordCounts = {};
      const words = text.toLowerCase().match(/\b\w+\b/g) || [];
      words.forEach(word => {
        if (!stopWords.has(word) && word.length > 2) wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
      const scoredSentences = sentences.map((sentence, index) => {
        const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
        let score = 0;
        sentenceWords.forEach(word => { if (wordCounts[word]) score += wordCounts[word]; });
        return { sentence: sentence.trim(), score, index };
      });
      const topSentences = scoredSentences.sort((a, b) => b.score - a.score).slice(0, targetCount).sort((a, b) => a.index - b.index);
      return topSentences.map(s => s.sentence).join(' ');
    }

    async _fetchDataset() {
      try {
        const response = await Scratch.fetch(this.datasetUrl);
        if (!response.ok) throw new Error('Network response error');
        this.dataset = await response.json();
        console.log('StudyAI Master Dataset successfully loaded!', this.dataset);
      } catch (err) {
        console.error('Failed to load StudyAI master dataset:', err);
      }
    }

    async fetchData() { await this._fetchDataset(); }
    isLoaded() { return this.dataset !== null; }

    _getTopicData(topicName) {
      if (!this.dataset) return null;
      const target = topicName.toLowerCase().trim();
      if (Array.isArray(this.dataset)) {
        return this.dataset.find(item => 
          (item.subject && item.subject.toLowerCase().includes(target)) || 
          (item.topic && item.topic.toLowerCase().includes(target))
        ) || null;
      }
      return null;
    }

    getTopics() {
      if (!this.dataset) return 'Dataset not loaded';
      if (Array.isArray(this.dataset)) return this.dataset.map(item => `${item.subject || 'Unknown'} (${item.topic || 'No Topic'})`).join(', ');
      return 'Invalid dataset structure';
    }

    getSummary(args) {
      const topic = this._getTopicData(args.TOPIC);
      if (!topic) return `Topic "${args.TOPIC}" not found.`;
      return topic.summary || topic.content || 'No content available.';
    }

    _parseFlashcards(topic) {
      if (!topic || !topic.flashcards) return [];
      if (Array.isArray(topic.flashcards)) return topic.flashcards;
      if (typeof topic.flashcards === 'string') {
        const rawStr = topic.flashcards;
        const qMatch = rawStr.match(/Q:\s*(.*?)(?=\s*\|\s*A:|$)/i);
        const aMatch = rawStr.match(/A:\s*(.*)/i);
        return [{ question: qMatch ? qMatch[1].trim() : rawStr, answer: aMatch ? aMatch[1].trim() : "" }];
      }
      return [];
    }

    _parseMCQs(topic) {
      if (!topic) return [];
      const rawMcq = topic.mcqs || topic.practice_test || topic.quiz || topic.questions;
      if (!rawMcq) return [];
      if (Array.isArray(rawMcq)) return rawMcq;
      if (typeof rawMcq === 'string') {
        const qMatch = rawMcq.match(/Q:\s*(.*?)(?=\s*[A-D]\)|$)/i);
        const aOpt = rawMcq.match(/A\)\s*(.*?)(?=\s*[B-D]\)|->|$)/i);
        const bOpt = rawMcq.match(/B\)\s*(.*?)(?=\s*[C-D]\)|->|$)/i);
        const cOpt = rawMcq.match(/C\)\s*(.*?)(?=\s*D\)|->|$)/i);
        const dOpt = rawMcq.match(/D\)\s*(.*?)(?=\s*->|$)/i);
        const ansMatch = rawMcq.match(/->\s*Answer:\s*([A-D])/i);
        return [{
          question: qMatch ? qMatch[1].trim() : rawMcq,
          choices: { A: aOpt ? aOpt[1].trim() : '', B: bOpt ? bOpt[1].trim() : '', C: cOpt ? cOpt[1].trim() : '', D: dOpt ? dOpt[1].trim() : '' },
          answer: ansMatch ? ansMatch[1].toUpperCase().trim() : ''
        }];
      }
      return [];
    }

    getFlashcardCount(args) { return this._parseFlashcards(this._getTopicData(args.TOPIC)).length; }
    getFlashcardSide(args) {
      const list = this._parseFlashcards(this._getTopicData(args.TOPIC));
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return args.SIDE.toLowerCase() === 'question' ? list[idx].question : list[idx].answer;
    }

    getTestCount(args) { return this._parseMCQs(this._getTopicData(args.TOPIC)).length; }
    getTestQuestion(args) {
      const list = this._parseMCQs(this._getTopicData(args.TOPIC));
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return list[idx].question;
    }
    getTestChoice(args) {
      const list = this._parseMCQs(this._getTopicData(args.TOPIC));
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return list[idx].choices?.[args.CHOICE.toUpperCase()] || '';
    }
    getTestAnswer(args) {
      const list = this._parseMCQs(this._getTopicData(args.TOPIC));
      const idx = Math.floor(args.INDEX) - 1;
      if (idx < 0 || idx >= list.length) return 'Index out of bounds';
      return list[idx].answer;
    }
  }

  Scratch.extensions.register(new StudyAI());
})(Scratch);
