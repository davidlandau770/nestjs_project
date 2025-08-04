import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ShiftDto } from './dto/shift.dto';

@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }
    // @UseGuards(AuthGuard)
    // @Roles('commander')
    @Post('add_shift')
    getUsers(@Body() body: {startTime?: Date, endTime?: Date, location: string} ) {
        return this.shiftsService.addShift(body);
    }
    @Post('update_endTime/:id')
    update_endTime(@Param('id') id: string) {
        return this.shiftsService.updateEndTime(id);
    }
}
