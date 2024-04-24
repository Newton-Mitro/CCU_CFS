import { AuthUserType } from '../../../../common/domain/types/auth-user.type';

export type EmploymentHistoryProps = {
  employmentHistoryId: string;
  organizationName: string;
  position: string;
  address: string;
  supervisorName: string;
  supervisorDesignation: string;
  supervisorPhone: string;
  jobResponsibilities: string;
  salary: number;
  startDate: Date;
  endDate: Date;
  tillNow: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: AuthUserType | null;
  updatedBy: AuthUserType | null;
};
