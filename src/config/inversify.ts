import 'reflect-metadata';
import {Container} from "inversify";
import {DoctorsService, DoctorsServiceImpl} from "../service/doctorsService";
import {Types} from "./types";
import {DoctorsRepository, DoctorsRepositoryImpl} from "../repository/doctorsRepository";
import {DoctorsBuilder, DoctorsBuilderImpl} from "../builder/doctorsBuilder";
import {DoctorsController, DoctorsControllerImpl} from "../controller/doctorsController";

const container = new Container();

//Controllers
container.bind<DoctorsController>(Types.DoctorsController).to(DoctorsControllerImpl).inSingletonScope();

//Services
container.bind<DoctorsService>(Types.DoctorsService).to(DoctorsServiceImpl).inSingletonScope();

//Repositories
container.bind<DoctorsRepository>(Types.DoctorsRepository).to(DoctorsRepositoryImpl).inSingletonScope();

// Builder
container.bind<DoctorsBuilder>(Types.DoctorsBuilder).to(DoctorsBuilderImpl).inSingletonScope();


export {container};