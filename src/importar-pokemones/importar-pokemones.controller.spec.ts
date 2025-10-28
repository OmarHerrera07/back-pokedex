import { Test, TestingModule } from '@nestjs/testing';
import { ImportarPokemonesController } from './importar-pokemones.controller';
import { ImportarPokemonesService } from './importar-pokemones.service';

describe('ImportarPokemonesController', () => {
  let controller: ImportarPokemonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportarPokemonesController],
      providers: [ImportarPokemonesService],
    }).compile();

    controller = module.get<ImportarPokemonesController>(ImportarPokemonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
