/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/": {
    get: operations["AppController_getHello"];
  };
  "/user": {
    get: operations["UserController_findAll"];
  };
  "/auth/sign-in": {
    post: operations["AuthController_signIn"];
  };
  "/auth/sign-up": {
    post: operations["AuthController_signUp"];
  };
  "/organization": {
    get: operations["OrganizationController_getAllUserOrganizations"];
    post: operations["OrganizationController_createOrganization"];
  };
  "/organization-member/{organizationId}": {
    get: operations["OrganizationMemberController_getOrganizationMembers"];
    post: operations["OrganizationMemberController_addMember"];
  };
  "/project": {
    post: operations["ProjectController_createOrganization"];
  };
  "/project/{organizationId}": {
    get: operations["ProjectController_getProjectsByOrganizationId"];
  };
  "/project/user/all": {
    get: operations["ProjectController_getAllUserProjects"];
  };
  "/project/details/{projectId}": {
    get: operations["ProjectController_getProjectDetails"];
  };
  "/project/time-spent/{projectId}": {
    get: operations["ProjectController_getProjectTimeStats"];
  };
  "/project-board/{projectId}": {
    get: operations["ProjectBoardController_getProjectBoard"];
  };
  "/project-board/{projectId}/columns": {
    get: operations["ProjectBoardController_getColumnsByProjectId"];
  };
  "/project-task/{projectId}/newest-task": {
    get: operations["ProjectTaskController_getNewestTask"];
  };
  "/project-task/{taskId}": {
    get: operations["ProjectTaskController_getTaskDetails"];
  };
  "/project-task/{projectId}/backlog": {
    get: operations["ProjectTaskController_getBacklogByProjectId"];
  };
  "/project-task": {
    put: operations["ProjectTaskController_updateTask"];
    post: operations["ProjectTaskController_createTask"];
  };
  "/project-task/column": {
    put: operations["ProjectTaskController_updateTaskColumn"];
  };
  "/project-task/time-log": {
    post: operations["ProjectTaskController_createTimeLog"];
  };
  "/project-sprint": {
    post: operations["ProjectSprintController_createSprint"];
  };
  "/project-sprint/active/{projectId}": {
    get: operations["ProjectSprintController_getActiveSprint"];
  };
  "/project/column/{projectId}": {
    get: operations["ProjectColumnController_getColumnsByProjectId"];
  };
  "/project/column": {
    post: operations["ProjectColumnController_createColumn"];
  };
  "/project/column/order": {
    put: operations["ProjectColumnController_updateColumnsOrder"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    SigInputDto: {
      email: string;
      password: string;
    };
    SignInDto: {
      accessToken: string;
    };
    CreateAccountInputDto: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };
    CreateOrganizationInputDto: {
      name: string;
      description: string | null;
    };
    OrganizationOwnerDto: {
      id: string;
      name: string;
    };
    UserOrganizationDto: {
      id: string;
      name: string;
      joinedAt: string;
      owner: components["schemas"]["OrganizationOwnerDto"];
    };
    OrganizationMemberDto: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      /** Format: date-time */
      joinedAt: string;
      role: string;
    };
    OrganizationMemberInputDto: {
      email: string;
      role: string;
      organizationId: string;
    };
    CreateProjectInputDto: {
      name: string;
      code: string;
      organizationId: string;
      description: string | null;
    };
    ProjectDto: {
      id: string;
      name: string;
      code: string;
      organizationId: string;
      organization: components["schemas"]["UserOrganizationDto"];
    };
    TaskAssignedUserDto: {
      id: string;
      name: string;
    };
    TaskTimeEntryDto: {
      taskId: string;
      taskCode: string;
      timeSpent: number;
    };
    UserWithTasksTimeDto: {
      user: components["schemas"]["TaskAssignedUserDto"];
      taskTimes: components["schemas"]["TaskTimeEntryDto"][];
      totalTimeSpent: number;
    };
    UserTimeEntryDto: {
      user: components["schemas"]["TaskAssignedUserDto"];
      timeSpent: number;
    };
    TaskWithUsersTimeDto: {
      taskId: string;
      taskCode: string;
      userTimes: components["schemas"]["UserTimeEntryDto"][];
      totalTimeSpent: number;
    };
    ProjectTimeSpentDto: {
      projectId: string;
      projectName: string;
      userStats: components["schemas"]["UserWithTasksTimeDto"][];
      taskStats: components["schemas"]["TaskWithUsersTimeDto"][];
      totalTimeSpent: number;
    };
    BoardTaskDto: {
      id: string;
      name: string;
      code: string;
      assignedUser: components["schemas"]["TaskAssignedUserDto"];
      priority: string;
      aboveTaskId: Record<string, never>;
      isBacklog: boolean;
    };
    ProjectColumnWithTasksDto: {
      id: string;
      name: string;
      order: number;
      tasks: components["schemas"]["BoardTaskDto"][];
    };
    ProjectBoardDto: {
      columns: components["schemas"]["ProjectColumnWithTasksDto"][];
      organizationId: string;
      name: string;
    };
    ProjectColumnDto: {
      id: string;
      name: string;
      order: number;
    };
    NewestTaskDto: {
      id: string;
      code: string;
    };
    TaskDetailsDto: {
      id: string;
      name: string;
      code: string;
      assignedUser: components["schemas"]["TaskAssignedUserDto"];
      priority: string;
      aboveTaskId: Record<string, never>;
      isBacklog: boolean;
      content: string;
      columnId: string;
      organizationId: string;
      timeLogs: string[];
      totalTimeSpent: number;
      estimatedTime: number;
    };
    CreateTaskInputDto: {
      name: string;
      content: string;
      projectId: string;
      columnId: string;
      priority: string;
      assignedUserId?: string;
      estimatedTime?: number;
      isBacklog?: boolean;
    };
    UpdateTaskColumnInputDto: {
      taskId: string;
      columnId: string;
      aboveTaskId?: Record<string, never>;
    };
    UpdateTaskInputDto: {
      taskId: string;
      name: string;
      content: string;
      columnId: string;
      priority: string;
      assignedUserId?: string;
      estimatedTime?: number;
    };
    TaskTimeLogInputDto: {
      taskId: string;
      timeSpent: number;
      description?: string;
    };
    CreateSprintInputDto: {
      name: string;
      /** Format: date-time */
      startDate: string;
      /** Format: date-time */
      endDate: string;
      projectId: string;
      isActive: boolean;
    };
    SprintDto: {
      id: string;
      number: number;
      goal: string;
      /** Format: date-time */
      startDate: string;
      /** Format: date-time */
      endDate: string;
      isActive: boolean;
    };
    CreateProjectColumnInputDto: {
      name: string;
      previousColumnId: string | null;
      projectId: string;
    };
    UpdateColumnsOrderInputDto: {
      columns: {
        id?: string;
        order?: number;
      };
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  AppController_getHello: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  UserController_findAll: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  AuthController_signIn: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SigInputDto"];
      };
    };
    responses: {
      /** @description Sign in */
      200: {
        content: {
          "application/json": components["schemas"]["SignInDto"];
        };
      };
    };
  };
  AuthController_signUp: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAccountInputDto"];
      };
    };
    responses: {
      /** @description Sign in */
      200: {
        content: {
          "application/json": components["schemas"]["SignInDto"];
        };
      };
    };
  };
  OrganizationController_getAllUserOrganizations: {
    responses: {
      /** @description Get all user organizations */
      200: {
        content: {
          "application/json": components["schemas"]["UserOrganizationDto"][];
        };
      };
    };
  };
  OrganizationController_createOrganization: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateOrganizationInputDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  OrganizationMemberController_getOrganizationMembers: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OrganizationMemberDto"][];
        };
      };
    };
  };
  OrganizationMemberController_addMember: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrganizationMemberInputDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  ProjectController_createOrganization: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateProjectInputDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  ProjectController_getProjectsByOrganizationId: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    responses: {
      /** @description Get all projects by organization id */
      200: {
        content: {
          "application/json": components["schemas"]["ProjectDto"][];
        };
      };
    };
  };
  ProjectController_getAllUserProjects: {
    responses: {
      /** @description Get all projects by user id */
      200: {
        content: {
          "application/json": components["schemas"]["ProjectDto"][];
        };
      };
    };
  };
  ProjectController_getProjectDetails: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get project details */
      200: {
        content: {
          "application/json": components["schemas"]["ProjectDto"];
        };
      };
    };
  };
  ProjectController_getProjectTimeStats: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get project time statistics */
      200: {
        content: {
          "application/json": components["schemas"]["ProjectTimeSpentDto"];
        };
      };
    };
  };
  ProjectBoardController_getProjectBoard: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get project board */
      200: {
        content: {
          "application/json": components["schemas"]["ProjectBoardDto"];
        };
      };
    };
  };
  ProjectBoardController_getColumnsByProjectId: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get columns by project id */
      200: {
        content: {
          "application/json": components["schemas"]["ProjectColumnDto"][];
        };
      };
    };
  };
  ProjectTaskController_getNewestTask: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get newest task by project id */
      200: {
        content: {
          "application/json": components["schemas"]["NewestTaskDto"];
        };
      };
    };
  };
  ProjectTaskController_getTaskDetails: {
    parameters: {
      path: {
        taskId: string;
      };
    };
    responses: {
      /** @description Get task details by task id */
      200: {
        content: {
          "application/json": components["schemas"]["TaskDetailsDto"];
        };
      };
    };
  };
  ProjectTaskController_getBacklogByProjectId: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get backlog by project id */
      200: {
        content: {
          "application/json": components["schemas"]["BoardTaskDto"][];
        };
      };
    };
  };
  ProjectTaskController_updateTask: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateTaskInputDto"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  ProjectTaskController_createTask: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTaskInputDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  ProjectTaskController_updateTaskColumn: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateTaskColumnInputDto"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  ProjectTaskController_createTimeLog: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["TaskTimeLogInputDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  ProjectSprintController_createSprint: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateSprintInputDto"];
      };
    };
    responses: {
      /** @description Sprint created successfully */
      201: {
        content: never;
      };
    };
  };
  ProjectSprintController_getActiveSprint: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get active sprint for project */
      200: {
        content: {
          "application/json": components["schemas"]["SprintDto"];
        };
      };
    };
  };
  ProjectColumnController_getColumnsByProjectId: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      /** @description Get all columns by project id */
      200: {
        content: {
          "application/json": components["schemas"]["ProjectColumnDto"][];
        };
      };
    };
  };
  ProjectColumnController_createColumn: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateProjectColumnInputDto"];
      };
    };
    responses: {
      /** @description Create a column for a project */
      200: {
        content: never;
      };
    };
  };
  ProjectColumnController_updateColumnsOrder: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateColumnsOrderInputDto"];
      };
    };
    responses: {
      /** @description Update columns order */
      200: {
        content: never;
      };
    };
  };
}
