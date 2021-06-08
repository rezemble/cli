'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('<%= tableName %>', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      <% attributes.forEach(function(attribute) { %>
        <%= attribute.fieldName %>: {
          type: Sequelize.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(Sequelize.${attribute.dataType.toUpperCase()})` : attribute.dataValues ? `${attribute.dataType.toUpperCase()}(${attribute.dataValues})` : attribute.dataType.toUpperCase() %>,
          <%= attribute.references ? `references: {
            model: {
              ${attribute.schema ? `schema: '${attribute.schema}',` : ''}
              tableName: '${attribute.references}',
            },
            key: '${attribute.key}',
          },` : '' %>
        },
      <% }) %>

      <%= createdAt %>: {
        allowNull: false,
        type: Sequelize.DATE
      },

      <%= updatedAt %>: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }<%= schema ? `,
    {
      schema: '${schema}',
    }` : '' %>);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('<%= tableName %>');
  }
};
