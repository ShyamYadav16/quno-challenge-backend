import "reflect-metadata";
import DoctorsTestBuilder from "../utils/doctorsTestBuilder";
import {Result} from "../../entity/result";
import {DoctorsController, DoctorsControllerImpl} from "../../controller/doctorsController";

describe('test doctors controller', () => {

  let doctorsController: DoctorsController;

  describe('POST /', () => {

    it('should throw status code 400 if qunoScoreNumber is not a number', async () => {

      const event = {
        body: {
          "name": "Dr. Abc Xyz",
          "city": "Berlin",
          "country": "Germany",
          "avatarUrl": "http://ssfkjg.com",
          "qunoScoreNumber": '10',
          "ratingsAverage": 7,
          "treatmentsLastYear": 100,
          "yearsExperience": 8,
          "basePrice": 20
        }
      };

      const mockService = DoctorsTestBuilder.getMockService(new Result('', ''));
      doctorsController = new DoctorsControllerImpl(mockService);

      const res = await doctorsController.saveDoctors(event);

      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.body).success).toEqual(false);
      expect(JSON.parse(res.body).data).toEqual([{"isNumber": "quno_score_number must be a number"}]);
    });

    it('should throw status code 400 if name does not exist', async () => {

      const event = {
        body: {
          "name": "",
          "city": "Berlin",
          "country": "Germany",
          "avatarUrl": "http://ssfkjg.com",
          "qunoScoreNumber": 10,
          "ratingsAverage": 7,
          "treatmentsLastYear": 100,
          "yearsExperience": 8,
          "basePrice": 20
        }
      };
      const mockService = DoctorsTestBuilder.getMockService(new Result('', ''));
      doctorsController = new DoctorsControllerImpl(mockService);

      const res = await doctorsController.saveDoctors(event);

      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.body).success).toEqual(false);
      expect(JSON.parse(res.body).data).toEqual([{"isNotEmpty": "name is required"}]);
    });

    it('should throw status code 400 if slug already exist', async () => {

      const event = {
        body: {
          "name": "Dr. Abc Xyz",
          "city": "Berlin",
          "country": "Germany",
          "avatarUrl": "http://ssfkjg.com",
          "qunoScoreNumber": 10,
          "ratingsAverage": 7,
          "treatmentsLastYear": 100,
          "yearsExperience": 8,
          "basePrice": 20
        }
      };

      const mockService = DoctorsTestBuilder.getMockService(new Result(`Doctor with slug dr.-abc-xyz already exist!`, undefined));
      doctorsController = new DoctorsControllerImpl(mockService);

      const res = await doctorsController.saveDoctors(event);

      expect(mockService.saveDoctorsDetails).toHaveBeenCalled();
      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.body).success).toEqual(false);
      expect(JSON.parse(res.body).data).toEqual("Doctor with slug dr.-abc-xyz already exist!");

    });

    it('should insert doctor and return doctor with statusCode 200', async () => {

      const event = {
        body: {
          "name": "Dr. Abc Xyz",
          "city": "Berlin",
          "country": "Germany",
          "avatarUrl": "http://ssfkjg.com",
          "qunoScoreNumber": 10,
          "ratingsAverage": 7,
          "treatmentsLastYear": 100,
          "yearsExperience": 8,
          "basePrice": 20
        }
      };

      const mockService = DoctorsTestBuilder.getMockService(new Result(`success`, DoctorsTestBuilder.createDoctor()));
      doctorsController = new DoctorsControllerImpl(mockService);

      const res = await doctorsController.saveDoctors(event);
      const doctor = JSON.parse(res.body).data.doctor;
      expect(mockService.saveDoctorsDetails).toHaveBeenCalled();
      expect(res.statusCode).toEqual(200);
      expect(JSON.parse(res.body).success).toEqual(true);
      expect(doctor).toHaveProperty('name');
      expect(doctor).toHaveProperty('city');
      expect(doctor).toHaveProperty('country');
      expect(doctor).toHaveProperty('avatarUrl');
      expect(doctor).toHaveProperty('qunoScoreNumber');
      expect(doctor).toHaveProperty('ratingsAverage');
      expect(doctor).toHaveProperty('treatmentsLastYear');
      expect(doctor).toHaveProperty('yearsExperience');
      expect(doctor).toHaveProperty('basePrice');
      expect(doctor).toHaveProperty('slug');
      expect(doctor.slug).toEqual('dr.-abc-xyz');

    });

  });

});