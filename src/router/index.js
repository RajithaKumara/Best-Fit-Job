import Vue from 'vue'
import Router from 'vue-router'
import { seekerHomeRoute, employerHomeRoute } from '@/data/data';

//import components
import LoginComponent from '@/components/LoginComponent/LoginComponent'
import RegisterComponent from '@/components/RegisterComponent/RegisterComponent'

//import pages
import FirstPage from '@/pages/FirstPage/FirstPage'
import SignUpPage from '@/pages/SignUpPage/SignUpPage'
import SignUp from '@/pages/SignUpPage/SignUp'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'

//seeker
import SeekerHome from '@/pages/HomePage/SeekerHome'
import CreateProfile from '@/components/SeekerComponent/CreateProfile'
import EditProfile from '@/components/SeekerComponent/EditProfile'
import ViewProfile from '@/components/SeekerComponent/ViewProfile'
import AddSkills from '@/components/SeekerComponent/AddSkills'
import UpdateSkills from '@/components/SeekerComponent/UpdateSkills'
import ViewSuggestions from '@/components/SeekerComponent/ViewSuggestions'
import SearchJobs from '@/components/SeekerComponent/SearchJobs'
import ApplyForJob from '@/components/SeekerComponent/ApplyForJob'
import MakeResume from '@/components/SeekerComponent/MakeResume'

import Account from '@/components/SeekerComponent/Account'
import Notification from '@/components/SeekerComponent/Notification'

//employer
import EmployerHome from '@/pages/HomePage/EmployerHome'
import CreateProfileEmp from '@/components/EmployerComponent/CreateProfileEmp'
import EditProfileEmp from '@/components/EmployerComponent/EditProfileEmp'
import ViewProfileEmp from '@/components/EmployerComponent/ViewProfileEmp'
import AddJobs from '@/components/EmployerComponent/AddJobs'
import UpdateJobs from '@/components/EmployerComponent/UpdateJobs'
import ViewJobs from '@/components/EmployerComponent/ViewJobs'
import SearchJobSeekers from '@/components/EmployerComponent/SearchJobSeekers'

import AccountEmp from '@/components/EmployerComponent/AccountEmp'
import NotificationEmp from '@/components/EmployerComponent/NotificationEmp'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstPage',
      component: FirstPage,
      children: [
        {
          path: 'Login',
          component: LoginComponent
        },
        {
          path: 'Register',
          component: RegisterComponent
        },
      ]
    },
    {
      path: employerHomeRoute,
      component: EmployerHome,
      caseSensitive: true,
      children: [
        {
          path: '',
          component: NotificationEmp
        },
        {
          path: 'CreateProfile',
          component: CreateProfileEmp
        },
        {
          path: 'EditProfile',
          component: EditProfileEmp
        },
        {
          path: 'ViewProfile',
          component: ViewProfileEmp
        },
        {
          path: 'AddJobs',
          component: AddJobs
        },
        {
          path: 'UpdateJobs',
          component: UpdateJobs
        },
        {
          path: 'ViewJobs',
          component: ViewJobs
        },
        {
          path: 'SearchJobSeekers',
          component: SearchJobSeekers
        },

        {
          path: 'Account',
          component: AccountEmp
        },

        {
          path: 'Notification',
          component: NotificationEmp
        }
      ]
    },
    {
      path: seekerHomeRoute,
      component: SeekerHome,
      caseSensitive: true,
      children: [
        {
          path: '',
          component: Notification
        },
        {
          path: 'CreateProfile',
          component: CreateProfile
        },
        {
          path: 'EditProfile',
          component: EditProfile
        },
        {
          path: 'ViewProfile',
          component: ViewProfile
        },
        {
          path: 'AddSkills',
          component: AddSkills
        },
        {
          path: 'UpdateSkills',
          component: UpdateSkills
        },
        {
          path: 'ViewSuggestions',
          component: ViewSuggestions
        },
        {
          path: 'SearchJobs',
          component: SearchJobs
        },
        {
          path: 'ApplyForJob',
          component: ApplyForJob
        },
        {
          path: 'MakeResume',
          component: MakeResume
        },

        {
          path: 'Account',
          component: Account
        },

        {
          path: 'Notification',
          component: Notification
        }
      ]
    },
    {
      path: '/userSignUp',
      name: 'SignUp',
      component: SignUp,
      caseSensitive: true
    },
    {
      path: '/SignUp',
      name: 'SignUpPage',
      component: SignUpPage,
      caseSensitive: true
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ],
  mode: 'hash'
})
