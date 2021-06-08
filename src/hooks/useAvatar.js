
const defaultAvatars = [
  '/images/pullDog.jpg',
  '/images/avatar2.jpg',
  '/images/avatar3.jpg',
  '/images/avatar4.jpg',
]

export function useAvatar(userId, authorAvatar) {
  const idxDefaultAvatar = userId % defaultAvatars.length;

  return authorAvatar || defaultAvatars[idxDefaultAvatar]
}