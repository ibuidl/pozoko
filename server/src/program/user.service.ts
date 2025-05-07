import { Injectable } from '@nestjs/common';
import { ProgramService } from './program.service';
import { UserInfo, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { check_transaction } from 'src/common/check_transaction';
@Injectable()
export class UserService {
  constructor(
    private programService: ProgramService,
    @InjectRepository(UserInfo)
    private userRepository: Repository<UserInfo>,
  ) {}

  async verifyAndCompleteUser(
    txHash: string,
    supplementalData: {
      email: string;
      role?: UserRole;
      description?: string;
    },
  ): Promise<{ success: boolean; error?: string }> {
    const tx = await check_transaction(txHash, this.programService);

    const event = this.programService.parseUserInitializedEvent(
      tx.meta.logMessages,
    );
    if (!event) throw new Error('User creation not found in transaction');

    try {
      await this.userRepository.upsert(
        {
          public_key: event.user.toString(),
          nickname: event.nickname,
          email: supplementalData.email,
          role: supplementalData.role ?? UserRole.Listener,
          description: supplementalData.description ?? '',
          created_at: event.created_at,
          owner: event.owner.toString(),
        },
        {
          conflictPaths: ['metadata_cid'],
        },
      );
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  async findByPublicKey(publicKey: string): Promise<UserInfo | null> {
    return this.userRepository.findOne({
      where: { public_key: publicKey },
    });
  }

  async findByEmail(email: string): Promise<UserInfo | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findAll(options?: {
    role?: UserRole;
    skip?: number;
    take?: number;
  }): Promise<[UserInfo[], number]> {
    const where = options?.role ? { role: options.role } : {};
    return this.userRepository.findAndCount({
      where,
      skip: options?.skip || 0,
      take: options?.take || 10,
      order: { created_at: 'DESC' },
    });
  }

  async getUserInfo(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;
  }
}
