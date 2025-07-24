import apiClient from './base';
import {
  ApiResponse,
  SendMailRequest
} from './types';

class MailApiService {
  private readonly basePath = '/v1/mail';

  /**
   * Test mail functionality
   */
  async testMail(mailData: SendMailRequest): Promise<ApiResponse<{ messageId: string }>> {
    return apiClient.post<{ messageId: string }>(`${this.basePath}/test`, mailData);
  }

}

const mailApi = new MailApiService();
export default mailApi;
