import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import PrivateRoute from './components/Routing/PrivateRoute';
import Home from "./components/GeneralScreens/Home"
import LoginScreen from "./components/AuthScreens/LoginScreen"
import RegisterScreen from "./components/AuthScreens/RegisterScreen"
import ForgotPasswordScreen from "./components/AuthScreens/ForgotPasswordScreen"
import ResetPasswordScreen from "./components/AuthScreens/ResetPasswordScreen"
import AddStory from './components/StoryScreens/AddStory';
import DetailStory from './components/StoryScreens/DetailStory';
import Header from './components/GeneralScreens/Header';
import Footer from './components/GeneralScreens/Footer';
import Profile from './components/ProfileScreens/Profile';
import EditProfile from './components/ProfileScreens/EditProfile';
import ChangePassword from './components/ProfileScreens/ChangePassword';
import NotFound from './components/GeneralScreens/NotFound';
import EditStory from './components/StoryScreens/EditStory';
import ReadListPage from './components/ProfileScreens/ReadListPage';
import AddCategory from './components/StoryScreens/AddCategory';

const App = () => {

      return (
            <Router>

                  <div className="App">

                        <Routes>
                              <Route path="/blogadmin/" element={<LayoutsWithHeader />}>

                                    <Route path='*' element={<NotFound />} />

                                    <Route exact  path='/blogadmin/' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/' element={<Home />} />
                                    </Route>

                                    <Route exact path="/blogadmin/story/:slug" element={<DetailStory />} />

                                    <Route exact  path='/blogadmin/addstory' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/addstory' element={<AddStory />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/addcategory' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/addcategory' element={<AddCategory />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/profile' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/profile' element={<Profile />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/edit_profile' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/edit_profile' element={<EditProfile />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/change_Password' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/change_Password' element={<ChangePassword />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/story/:slug/like' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/story/:slug/like' element={<DetailStory />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/story/:slug/edit' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/story/:slug/edit' element={<EditStory />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/story/:slug/delete' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/story/:slug/delete' element={<DetailStory />} />
                                    </Route>
                                    <Route exact  path='/blogadmin/story/:slug/addComment' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/story/:slug/addComment' element={<DetailStory />} />
                                    </Route>

                                    <Route exact  path='/blogadmin/readList' element={<PrivateRoute />}>
                                          <Route exact  path='/blogadmin/readList' element={<ReadListPage />} />
                                    </Route>

                              </Route>

                              <Route exact path="/blogadmin/login" element={<LoginScreen />} />
                              <Route exact path="/blogadmin/register" element={<RegisterScreen />} />

                              <Route exact path="/blogadmin/forgotpassword" element={<ForgotPasswordScreen />} />

                              <Route exact path="/blogadmin/resetpassword" element={<ResetPasswordScreen />} />


                        </Routes>

                  </div>

            </Router>

      );

}

const LayoutsWithHeader = () => {
      return (
            <>
                  <Header />
                  <Outlet />
                  <Footer />
            </>
      );
}

export default App;
