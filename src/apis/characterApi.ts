import { instance } from "./baseApi";

// 원정대 호출
export const getRoster = async (id: string) => {
  try {
    const response = await instance.get(`characters/${id}/siblings`);
    return response.data;
  } catch (error) {
    throw new Error("Fail to load character Roster");
  }
};

const characterURL = "/armories/characters";

export const getCharacter = async (id: string) => {
  try {
    const response = await instance.get(`${characterURL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Fail to load character Character");
  }
};

// 캐릭터 프로필
export const getCharacterProfile = async (id: string) => {
  try {
    const response = await instance.get(`${characterURL}/${id}/profiles`);
    return response.data;
  } catch (error) {
    throw new Error("Fail to load character Character");
  }
};
