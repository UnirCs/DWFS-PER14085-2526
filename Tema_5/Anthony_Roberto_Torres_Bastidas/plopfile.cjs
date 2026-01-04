module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Crea un nuevo componente de React',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '¿Cuál es el nombre del componente?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
        templateFile: 'plop-templates/component.css.hbs',
      },
    ],
  });
};

