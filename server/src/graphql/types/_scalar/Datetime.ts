const { scalarType } = require('nexus');

const Datetime = scalarType({
  name: 'Datetime',
  asNexusMethod: 'datetime', // This allows you to use it as a method on other types
  serialize: (value:Date) => value.toISOString(), // Serialize the date to ISO string
  parseValue: (value: string | number | Date) => new Date(value), // Parse the ISO string to a Date object
  
});

export { Datetime };

