import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<T> {

    @ApiProperty({ description: "Datos paginados"})
    data: T[];

    @ApiProperty({ description: "Total de registros paginados"})
    total: number;

    @ApiProperty({ description: "Pagina actual"})
    page: number;

    @ApiProperty({ description: "Total de paginas"})
    totalPages: number;

    @ApiProperty({ description: "Tiene pagina siguiente?"})
    hasNextPage: boolean;

    @ApiProperty({ description: "Tiene pagina anterior?"})
    hasPreviousPage: boolean;
}