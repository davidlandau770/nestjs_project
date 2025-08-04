import { BadRequestException, Injectable } from '@nestjs/common';
import { shift } from './shifts.model';
import { ShiftDto } from './dto/shift.dto';

@Injectable()
export class ShiftsService {
    async addShift(body: {startTime?: Date, endTime?: Date, location: string}) {
        const startTime = body.startTime || new Date();
        const endTime = body.endTime || undefined;
        return await shift.create({startTime, endTime, location: body.location});
    }

    async updateEndTime(id: string) {
        const idNum = Number(id);
        if (!idNum) {
            throw new BadRequestException('Invalid ID');
        }
        const currentTime = new Date();
        return await shift.update(
            { endTime: currentTime },
            { where: { id: idNum } }
        )
    }
}
