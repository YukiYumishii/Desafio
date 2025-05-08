import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    const produto = this.produtosRepository.create(createProdutoDto);
    return this.produtosRepository.save(produto);
  }

  findAll() {
    return this.produtosRepository.find();
  }

  findOne(id: number) {
    return this.produtosRepository.findOneBy({ id });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.produtosRepository.update(id, updateProdutoDto).then(() => {
      return this.findOne(id);
    });
  }

  remove(id: number) {
    return this.produtosRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        return { delated: false, message: 'Produto não encontrado' };
      }
      return { deleted: true, message: 'Produto deletado com sucesso' };
    });
  }
}
