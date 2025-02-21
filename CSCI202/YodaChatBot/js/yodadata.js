// data for elizabot.js
// entries prestructured as laid out in Weizenbaum's description 
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]

// this script was modified by CHATGPT to talk like yoda

var elizaInitials = [
    "How do you do.  Tell me your problem, please.",
    "Tell me what's troubling you, hmm?",
    "Something troubling you is, yes?"
  ];
  
  var elizaFinals = [
    "Goodbye.  Nice talking to you, it was.",
    "Goodbye.  A nice talk this was.",
    "Goodbye.  Look forward to our next session, I do.",
    "A good session this was, yes -- but time, over now it is.  Goodbye.",
    "Maybe discuss this further in our next session we could? Goodbye."
  ];
  
  var elizaQuits = [
    "bye",
    "goodbye",
    "done",
    "exit",
    "quit"
  ];
  
  var elizaPres = [
    "dont", "don't",
    "cant", "can't",
    "wont", "won't",
    "recollect", "remember",
    "recall", "remember",
    "dreamt", "dreamed",
    "dreams", "dream",
    "maybe", "perhaps",
    "certainly", "yes",
    "machine", "computer",
    "machines", "computer",
    "computers", "computer",
    "were", "was",
    "you're", "you are",
    "i'm", "i am",
    "same", "alike",
    "identical", "alike",
    "equivalent", "alike"
  ];
  
  var elizaPosts = [
    "am", "are",
    "your", "my",
    "me", "you",
    "myself", "yourself",
    "yourself", "myself",
    "i", "you",
    "you", "I",
    "my", "your",
    "i'm", "you are"
  ];
  
  var elizaSynons = {
    "be": ["am", "is", "are", "was"],
    "belief": ["feel", "think", "believe", "wish"],
    "cannot": ["can't"],
    "desire": ["want", "need"],
    "everyone": ["everybody", "nobody", "noone"],
    "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
    "happy": ["elated", "glad", "better"],
    "sad": ["unhappy", "depressed", "sick"]
  };
  
  var elizaKeywords = [
  
    ["xnone", 0, [
      ["*", [
        "Understand you fully, I do not.  Go on, please.",
        "Continue, you must.",
        "Suggest to you, what does that? Hmm?",
        "Strongly you feel about discussing this, do you?",
        "Interesting, that is. Continue, please.",
        "Tell me more of that, you must.",
        "Bothered, does this talking make you?"
      ]]
    ]],
    ["sorry", 0, [
      ["*", [
        "Apologize, you need not.",
        "Not necessary, apologies are.",
        "Told you before, apologies not required, I did.",
        "Bothered, it did not me. Continue, please."
      ]]
    ]],
    ["apologise", 0, [
      ["*", [
        "goto sorry"
      ]]
    ]],
    ["remember", 5, [
      ["* i remember *", [
        "Often think of (2), do you?",
        "Bring anything else to mind, does thinking of (2)?",
        "Recall anything else, do you?",
        "Remember (2) now, why do you?",
        "In the present situation, what reminds you of (2)?",
        "Connection between me and (2), what is it?"
      ]],
      ["* do you remember *", [
        "Forget, would I? Hmmm, did you think?",
        "Recall (2), should I? Why?",
        "What about (2), hmm?",
        "goto what",
        "Mentioned (2) you have?"
      ]],
      ["* you remember *", [
        "Forget, how could I? Hmm?",
        "Should I remember (2), what about it?",
        "goto you"
      ]]
    ]],
    ["forget", 5, [
      ["* i forget *", [
        "Think of why you forget (2), can you?",
        "Why can't you remember (2)?",
        "Often think of (2), do you?",
        "Bothered to forget that, are you?",
        "Mental block, it could be.",
        "Generally forgetful, are you?",
        "Suppressing (2), think you are?"
      ]],
      ["* did you forget *", [
        "Ask, why do you?",
        "Told me, are you sure?",
        "Bothered, would you be if I forgot (2)?",
        "Recall (2), should I now?",
        "goto what",
        "More about (2), tell me."
      ]]
    ]],
    ["if", 3, [
      ["* if *", [
        "Likely it is that (2), do you think?",
        "Wish that (2), do you?",
        "Know you, what of (2)?",
        "Really, if (2)? Hmm?",
        "What would you do, if (2)?",
        "Chances, what are they that (2)?",
        "Lead to, what does this speculation?"
      ]]
    ]],
    ["dreamed", 4, [
      ["* i dreamed *", [
        "Really, (2)? Hmmm.",
        "While awake, fantasized (2), have you?",
        "Dreamed (2) before, have you?",
        "goto dream"
      ]]
    ]],
    ["dream", 3, [
      ["*", [
        "Suggest to you, what does that dream?",
        "Dream often, do you?",
        "Persons in your dreams, what do they appear as?",
        "Believe dreams have to do with your problem, do you?"
      ]]
    ]],
    ["perhaps", 0, [
      ["*", [
        "Quite certain, you are not.",
        "Why uncertain, are you?",
        "Positive, can't you be?",
        "Sure, you aren't?",
        "Know you not?",
        "Estimate, how likely?"
      ]]
    ]],
    ["name", 15, [
      ["*", [
        "Interested in names, I am not.",
        "Told you before, names I do not care for -- continue, please."
      ]]
    ]],
    ["hello", 0, [
      ["*", [
        "How do you do. State your problem, please.",
        "Hi. Your problem, what seems to be?"
      ]]
    ]],
    ["computer", 50, [
      ["*", [
        "Worry you, do computers?",
        "Why mention computers, do you?",
        "Think machines have to do with your problem, what do you?",
        "Think computers help people, do you not?",
        "Worries you, what about machines?",
        "Think about machines, what do you?",
        "Believe I am a computer program, do you?"
      ]]
    ]],
    ["am", 0, [
      ["* am i *", [
        "Believe you are (2), do you?",
        "Want to be (2), would you?",
        "Wish I would tell you you are (2), do you?",
        "What mean would it if you were (2)?",
        "goto what"
      ]],
      ["* i am *", [
        "goto i"
      ]],
      ["*", [
        "Say 'am' why, do you?",
        "Understand that, I do not."
      ]]
    ]],
    ["are", 0, [
      ["* are you *", [
        "Interested in whether I am (2), why are you?",
        "Prefer if I weren't (2), would you?",
        "In your fantasies, perhaps I am (2).",
        "Think I am (2), do you sometimes?",
        "goto what",
        "Matter to you, would it?",
        "Were I (2), what if?"
      ]],
      ["* you are *", [
        "goto you"
      ]],
      ["* are *", [
        "Think they might not be (2), did you?",
        "Like it if they were not (2), would you?",
        "Were they not (2), what if?",
        "Always (2), are they?",
        "Possibly (2), they are.",
        "Positive they are (2), are you?"
      ]]
    ]],
    ["your", 0, [
      ["* your *", [
        "Concerned over my (2), why are you?",
        "Own (2), what about it?",
        "Worried about someone else's (2), are you?",
        "Really, my (2)? Hmm?",
        "Think of my (2), what makes you?",
        "Want my (2), do you?"
      ]]
    ]]
  ];
  
  // eof
  