class Tab {
    static Today = new Tab('Today');
    static All = new Tab('All');
    static Completed = new Tab('Completed');
    static InComplete = new Tab('InComplete');
  
    constructor(name) {
      this.name = name;
    }
    toString() {
      return `Color.${this.name}`;
    }
  }

  module.exports=Tab