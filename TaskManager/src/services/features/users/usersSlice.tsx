type User = {
  message: string;
  code: number;
  error: boolean;
  data: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    profile_url: string;
    phone: string;
    workspaces: [];
    workspaceMember: [];
    taskAssignees: [];
    comments: [];
    settings: [];
    projectMember: [];
    _id: string;
  };
};
