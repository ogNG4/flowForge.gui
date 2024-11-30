export enum OrganizationMemberRole {
    OWNER = 'Owner',
    ADMIN = 'Admin',
    MEMBER = 'Member',
}

export enum TaskPriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export const userRoles = [
    { label: 'Administrator', value: OrganizationMemberRole.ADMIN },
    { label: 'Użytkownik', value: OrganizationMemberRole.MEMBER },
];
