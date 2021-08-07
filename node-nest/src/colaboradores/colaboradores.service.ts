import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { Colaborador } from './entities/colaborador.entity';

@Injectable()
export class ColaboradoresService {
  // Modificador de acesso: private/public
  // Private: só quem está na classe acessa
  // Public: qualquer código externo também acessa

  constructor(private readonly prisma: PrismaService) {}

  private readonly data: Colaborador[] = [
    {
      id: 1,
      nome: 'Paulo Salvatore',
      idade: 99,
    },
  ];

  create(createColaboradorDto: CreateColaboradorDto) {
    const item: Colaborador = {
      id: this.data.length + 1,
      ...createColaboradorDto,
    };

    this.data.push(item);

    return item;
  }

  findAll() {
    return this.data.filter(Boolean);
  }

  findOne(id: number) {
    const index = this.findIndexById(id);

    return this.data[index];
  }

  update(id: number, updateColaboradorDto: UpdateColaboradorDto) {
    const index = this.findIndexById(id);

    this.data[index] = {
      ...this.data[index],
      ...updateColaboradorDto,
    };

    return this.data[index];
  }

  remove(id: number) {
    const index = this.findIndexById(id);

    delete this.data[index];
  }

  private findIndexById(id: number) {
    const index = this.data.findIndex((item) => item?.id == id);

    if (!this.data[index]) {
      throw new EntityNotFoundError('Colaborador não encontrado.');
    }

    return index;
  }
}
