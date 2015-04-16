var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({

    CREATED_MATCH: 'cm',
    SELECTED_MATCH: 'sm',
    MATCH_READY: 'mr',
    MATCH_AVAILABLE: 'ma',
    JOINED_MATCH: 'jm',
    UPDATE_MATCH: 'um',
    DELETE_MATCH: 'dm',
    MATCH_START: 'ms',
    CREATE_NEW_PLAYER: 'cnp',
    DELETE_PLAYER: 'dp',
    START_TIMER_TICK: 'st',
    PHRASE_TIMER_TICK: 'ptt',
    CORRECT_ANSWER: 'cat',
    SEND_CORRECT_ANSWER: 'mak',
    GAME_TIMER_TICK: 'gat',
    GET_NEXT_PHRASES: 'gnp',
    TIMER_UPDATE: 'tup',
    RECEIVED_FOREIGN_CORRECT_ANSWER: 'uriehg',
    DISABLE_JOIN_BUTTON: 'djb'
  }),

  ControlTypes: {
    LIST: 0,
    BUTTON: 1,
    BUTTON_STRIP: 2,
    TEXT_FIELD: 3,
    DROP_DOWN: 4
  },

  AnswerStyles: [
    'primary',
    'success',
    'danger',
    'info'
  ],

  FileServerIP: '10.32.32.156',

  Phrases: [
    'Synergize the paradigm',
    'Drive value',
    'Operationalize the strategy',
    'Leverage our core compentencies',
    'Wholeistically administrate exceptional synergy',
    'Set the brand trajectory',
    'Advance the marketshare',
    'Promote viability and diversity in the supply chain',
    'Monetize our assets',
    'Visualize a value added experience',
    'Perform seamless cross-platform integrations',
    'Gain traction with our capitalized reputation in the marketplace',
    'Incentivize mission critical behaviors',
    'Implement flexible solutions for the customer base',
    'Take this conversation offline',
    'Execute opportunistic strategies',
    'Empower the product swimlanes',
    'Increase our share of wallet',
    'Activate thought leadership',
    'Form some tiger teams',
    'Fix the verbage in out takeaway',
    'Implement robust solutioning',
    'Hit the ground running with content marketing',
    'Hold the fort for a come to jesus moment',
    'Peel the onion to put this one to bed',
    'Pipeline our total quality takeaway',
    'Throw thought leadership over the wall',
    'Try proactive price point onboarding',
    'Manage the low hanging fruit',
    'Leverage our learnings to punch a puppy'
  ]
};
