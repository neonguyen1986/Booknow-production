export const adminMenu = [
    { //user mannage
        name: 'menu.admin.manage-user', menus: [
            { name: 'menu.admin.user-CRUD', link: '/system/user-manage' },
            { name: 'menu.admin.redux-CRUD', link: '/system/user-redux' },
            // subMenus: [
            //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            // ]

        ]
    },
    { //user mannage
        name: 'menu.admin.doctor', menus: [
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },
        ]
    },
    { //specialty mannage
        name: 'menu.admin.specialty', menus: [//, link: '/system/manage-specialty'
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },
        ]
    },
];

export const doctorMenu = [
    { //manage doctors' schedule
        name: 'menu.admin.doctor', menus: [
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },
            { name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient' },
        ]
    }
];