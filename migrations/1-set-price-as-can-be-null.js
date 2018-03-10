'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Producers", deps: []
 * createTable "Sites", deps: []
 * createTable "Laptops", deps: [Producers, Sites]
 *
 **/

const info = {
    'revision': 1,
    'name': 'set-price-as-can-be-null',
    'created': '2018-03-06T08:35:55.046Z',
    'comment': '',
};

const migrationCommands = [{
        fn: 'createTable',
        params: [
            'Producers',
            {
                'id': {
                    'type': Sequelize.INTEGER,
                    'autoIncrement': true,
                    'primaryKey': true,
                    'allowNull': false,
                },
                'name': {
                    'type': Sequelize.STRING(10),
                    'allowNull': false,
                    'unique': true,
                },
                'createdAt': {
                    'type': Sequelize.DATE,
                    'allowNull': false,
                },
                'updatedAt': {
                    'type': Sequelize.DATE,
                    'allowNull': false,
                },
            },
            {},
        ],
    },
    {
        fn: 'createTable',
        params: [
            'Sites',
            {
                'id': {
                    'type': Sequelize.INTEGER,
                    'autoIncrement': true,
                    'primaryKey': true,
                    'allowNull': false,
                },
                'name': {
                    'type': Sequelize.STRING(15),
                    'allowNull': false,
                    'unique': true,
                },
                'createdAt': {
                    'type': Sequelize.DATE,
                    'allowNull': false,
                },
                'updatedAt': {
                    'type': Sequelize.DATE,
                    'allowNull': false,
                },
            },
            {},
        ],
    },
    {
        fn: 'createTable',
        params: [
            'Laptops',
            {
                'id': {
                    'type': Sequelize.INTEGER,
                    'autoIncrement': true,
                    'primaryKey': true,
                    'allowNull': false,
                },
                'model': {
                    'type': Sequelize.STRING(50),
                    'allowNull': false,
                },
                'display': {
                    'type': Sequelize.FLOAT,
                },
                'price': {
                    'type': Sequelize.FLOAT,
                },
                'createdAt': {
                    'type': Sequelize.DATE,
                    'allowNull': false,
                },
                'updatedAt': {
                    'type': Sequelize.DATE,
                    'allowNull': false,
                },
                'ProducerId': {
                    'type': Sequelize.INTEGER,
                    'onUpdate': 'CASCADE',
                    'onDelete': 'CASCADE',
                    'references': {
                        'model': 'Producers',
                        'key': 'id',
                    },
                    'allowNull': false,
                },
                'SiteId': {
                    'type': Sequelize.INTEGER,
                    'onUpdate': 'CASCADE',
                    'onDelete': 'CASCADE',
                    'references': {
                        'model': 'Sites',
                        'key': 'id',
                    },
                    'allowNull': false,
                },
            },
            {},
        ],
    },
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize) {
        let index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    const command = migrationCommands[index];
                    console.log('[#'+index+'] execute: ' + command.fn);
                    index++;
                    queryInterface[command.fn](...command.params).then(next, reject);
                } else {
resolve();
}
            }
            next();
        });
    },
    info: info,
};
