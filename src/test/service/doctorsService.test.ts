import "reflect-metadata";
import DoctorsTestBuilder from "../utils/doctorsTestBuilder";
import {DoctorsService, DoctorsServiceImpl} from "../../service/doctorsService";
import {DoctorsQuery} from "../../schema/doctorsQuery";
import {DoctorsDetails} from "../../schema/doctorsDetails";
import {Doctor} from "../../entity/doctor";

describe('test doctors service', () => {

  let doctorsService: DoctorsService;

  it('test get all doctors service', async () => {

    const mockDoctorsRepo = DoctorsTestBuilder.getMockRepo();
    const mockDoctorsBuilder = DoctorsTestBuilder.getMockBuilder();
    doctorsService = new DoctorsServiceImpl(mockDoctorsRepo, mockDoctorsBuilder);

    const doctorsQuery = new DoctorsQuery(10, 0, 'name', 1);

    const doctors: Doctor[] = await doctorsService.getAllDoctors(doctorsQuery);
    expect(mockDoctorsRepo.getAllDoctors).toHaveBeenCalled();
    expect(doctors).toHaveLength(1);

  })

  it('test get doctor by slug', async () => {

    const mockDoctorsRepo = DoctorsTestBuilder.getMockRepo();
    const mockDoctorsBuilder = DoctorsTestBuilder.getMockBuilder();
    doctorsService = new DoctorsServiceImpl(mockDoctorsRepo, mockDoctorsBuilder);

    const result: any = await doctorsService.getDoctorById(1);
    expect(mockDoctorsRepo.getDoctorById).toHaveBeenCalled();
    expect(result['doctor']).toHaveProperty('name');
    expect(result['doctor']).toHaveProperty('city');
    expect(result['doctor']).toHaveProperty('country');
    expect(result['doctor']).toHaveProperty('avatarUrl');
    expect(result['doctor']).toHaveProperty('qunoScoreNumber');
    expect(result['doctor']).toHaveProperty('ratingsAverage');
    expect(result['doctor']).toHaveProperty('treatmentsLastYear');
    expect(result['doctor']).toHaveProperty('yearsExperience');
    expect(result['doctor']).toHaveProperty('basePrice');
    expect(result['doctor']).toHaveProperty('slug');
  });

  it('should save doctor', async () => {

    const mockDoctorsRepo = DoctorsTestBuilder.getMockRepo();
    const mockDoctorsBuilder = DoctorsTestBuilder.getMockBuilder();
    doctorsService = new DoctorsServiceImpl(mockDoctorsRepo, mockDoctorsBuilder);

    const doctorsDetail: DoctorsDetails = new DoctorsDetails('Dr. Abc Xyz', 'Berlin', 'Germany',
      'http://adgsdf.com', 9, 4, 2000, 15,
      1000);

    await doctorsService.saveDoctorsDetails(doctorsDetail);
    expect(mockDoctorsBuilder.prepareSlug).toHaveBeenCalled();
    expect(mockDoctorsBuilder.prepare).toHaveBeenCalled();
    expect(mockDoctorsBuilder.save).toHaveBeenCalled();
  });

});