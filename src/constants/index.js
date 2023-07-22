import mathematics from "../assets/mathematics.png";
import chemistry from "../assets/chemistry.png";
import physics from "../assets/physics.png";
import biology from "../assets/biology.png";

export const appURLS = {
    LOGIN: "/login",
    SUBJECTS: "/dashboard",
    COURSE: "/course",
    PLAY: "/play",
    WORKSHEET: "/worksheet",
    PROFILE: "/profile",
    SETTINGS: "/settings",
    ABOUT_US: "/about-us",
    CONTACT_US: "/contact-us",
    CHEMISTRY: "/chemistry",
    PHYSICS: "/physics",
    MATHEMATICS: "/mathematics",
    BIOLOGY: "/biology",
}


export const menuItems = [
    {
        name: "WorkSheet",
        url: appURLS.WORKSHEET
    },
    {
        name: "Profile",
        url: appURLS.PROFILE
    },
    {
        name: "Settings",
        url: appURLS.SETTINGS
    },
    {
        name: "About us",
        url: appURLS.ABOUT_US
    },
    {
        name: "Contact us",
        url: appURLS.CONTACT_US
    }
]

export const availableSubjects = [
    {
      icon: chemistry,
      SubjectName: "Chemistry",
      redirection: appURLS.CHEMISTRY
  },
  {
      icon: mathematics,
      SubjectName: "Mathematics",
      redirection: appURLS.MATHEMATICS
  },
  {
      icon: physics,
      SubjectName: "Physics",
      redirection: appURLS.PHYSICS
  },
  {
    icon: biology,
    SubjectName: "Biology",
    redirection: appURLS.CHEMISTRY
  }
  
]