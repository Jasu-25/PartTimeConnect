import { Routes, Route } from 'react-router'
import { HomePage } from './pages/landingpage/HomePage'
import { LoginRoleSelection } from './pages/Authentication/LoginRoleSelection'
import { SignupRoleSelection } from './pages/Authentication/SignupRoleSelection'
import { JobSeekerlogin } from './pages/Authentication/JobSeekerlogin'
import { JobSeekersignup } from './pages/Authentication/JobSeekersignup'
import { JobProviderlogin } from './pages/Authentication/JobProviderlogin'
import { JobProvidersignup } from './pages/Authentication/JobProvidersignup'
import { ProviderDashboard } from './pages/Provider/ProviderDashboard'
import { SeekerDashboard } from './pages/Seeker/SeekerDashboard'
import { SeekerApplied } from './pages/Seeker/SeekerApplied'
import { SeekerSaved } from './pages/Seeker/SeekerSaved'
import { SeekerSearch } from './pages/Seeker/SeekerSearch'
import { SeekerProfile } from './pages/Seeker/SeekerProfile'
import { SeekerUpdateProfile } from './pages/Seeker/SeekerUpdateProfile'
import { SeekerSettings } from './pages/Seeker/SeekerSettings'
import { ProviderProfile } from './pages/Provider/ProviderProfile'
import { ProviderProfileUpdate } from './pages/Provider/ProviderProfileUpdate'
import { ProviderPostings } from './pages/Provider/ProviderPostings'
import { ProviderJobsOverview } from './pages/Provider/ProviderJobsOverview'
import ProviderJobApplicants from './pages/Provider/ProviderJobApplicants'
import { ProviderSettings } from './pages/Provider/ProviderSettings'
import ProviderPostJob from './pages/Provider/ProviderPostJob'
import ProviderUpdateJob from './pages/Provider/ProviderUpdateJob'
import { SeekerAppliedJobDetails } from './pages/Seeker/SeekerAppliedJobDetails'
import ProviderHired from './pages/Provider/ProviderHired'
import { Uiloader } from './pages/landingpage/Ui-loader'
function App() {
  return (
    <>

      <title>Part-Time Connect</title>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginRoleSelection />} />
        <Route path='/signup' element={<SignupRoleSelection />} />
        <Route path='/jobseekerlogin' element={<JobSeekerlogin />} />
        <Route path='/jobseekersignup' element={<JobSeekersignup />} />
        <Route path='/jobproviderlogin' element={<JobProviderlogin />} />
        <Route path='/jobprovidersignup' element={<JobProvidersignup />} />
        <Route path='/providerdashboard' element={<ProviderDashboard />} />
        <Route path='/seekerdashboard' element={<SeekerDashboard/>} />
        <Route path='/seekerappliedjob' element={<SeekerApplied />} />
        <Route path='/seekersavedjob' element={<SeekerSaved />} />
        <Route path='/seekersearch' element={<SeekerSearch />} />
        <Route path='/seekerprofile' element={<SeekerProfile />} />
        <Route path='/seekerprofileupdate' element={<SeekerUpdateProfile />} />
        <Route path='/seekersettings' element={<SeekerSettings />} />
        <Route path='/providerprofile' element={<ProviderProfile />} />
        <Route path='/providerprofileupdate' element={<ProviderProfileUpdate />} />
        <Route path='/providerpostings' element={<ProviderPostings />} />
        <Route path='/providerjobsoverview' element={<ProviderJobsOverview />} />
        <Route path='/providerjobapplicants' element={<ProviderJobApplicants />} />
        <Route path='/providersettings' element={<ProviderSettings />} />
        <Route path='/providerpostjob/:jobid' element={<ProviderPostJob />} />
        <Route path='/providerpostjob/' element={<ProviderPostJob />} />
        <Route path='/providerUpdatejob' element={<ProviderUpdateJob />} />
        <Route path='/seekerapplieddetails/:jobid' element={<SeekerAppliedJobDetails/>} />
        <Route path='/providerHired' element={<ProviderHired />} />
        <Route path='/loader' element={ <Uiloader/> } />
      </Routes>
    </>
  )
}

export default App
