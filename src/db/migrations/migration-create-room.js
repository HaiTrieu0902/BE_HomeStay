'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'Rooms',
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                },
                title: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                detail: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                price: {
                    allowNull: false,
                    type: Sequelize.BIGINT,
                },
                area: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                capacity: {
                    allowNull: false,
                    type: Sequelize.BIGINT,
                },
                description: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                status: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                categoryKey: {
                    allowNull: false,
                    type: Sequelize.UUID,
                    references: {
                        model: 'Categories',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE', // Các tùy chọn về cập nhật dữ liệu
                    onDelete: 'CASCADE', // Các tùy chọn về xóa dữ liệu
                },

                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            },
            // await queryInterface.addColumn('Staffs', 'tesing', {
            //     type: Sequelize.STRING,
            // }),
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Rooms');
    },
};
