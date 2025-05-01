import { styled } from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { userInfoQuery, deleteUserMutation } from "~/services/profile";
import { User } from "~/services/types";

const ProfileContainer = styled.div`
  border-radius: 16px 16px 0 0;
  background-color: var(--Background-1, #fdfaf7);
  padding: 20px 20px 80px;
  height: 100%;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

export const Component = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery(userInfoQuery);
  const user = data?.data as User;
  const mutation = useMutation({
    ...deleteUserMutation,
    onSuccess: (res) => {
      Swal.fire({
        title: "Deleted!",
        text: "Your account has been deleted.",
        icon: "success",
      }).then(() => {
        const resMessage = res.message || "User deleted successfully";
        toast.success(resMessage);
        localStorage.removeItem("token");
        queryClient.clear();
        navigate("/");
      });
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can contact the support team to recover your account within 30 days; after that period, your user data will be permanently deleted from the database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          mutation.mutate();
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  return (
    <ProfileContainer>
      <section className="bg-transparent">
        <div className="container mx-auto py-5">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-4 px-3">
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <img src="/images/default-avatar.png" alt="avatar" className="rounded-full w-36 mx-auto" />
                <h5 className="text-gray-900 my-3">{user?.name || "John Doe"}</h5>
                <p className="text-gray-600 mt-2">{user?.role || "User"}</p>
                <p className="text-gray-500">{user?.company_name || "Lucia"}</p>
                <div className="flex justify-center mt-2">
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete()}>
                    Delete
                  </button>
                  <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded ml-2">Update</button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md mt-4">
                <ul className="divide-y divide-gray-200">
                  <li className="flex justify-between items-center p-3">
                    <span className="text-yellow-500">🌐</span>
                    <span className="text-blue-500">https://luciaprotocol.com/</span>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-gray-800">🐱</span>
                    <span className="text-blue-500">https://twitter.com/luciaprotocol</span>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-blue-400">🐦</span>
                    <span className="text-blue-500">https://www.linkedin.com/luciaprotocol</span>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-pink-600">📸</span>
                    <span className="text-blue-500">https://Linktr.ee/luciaprotocol</span>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-blue-800">📘</span>
                    <span className="text-blue-500">@lingqingmeng</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex mb-2">
                  <div className="w-1/4 text-gray-800">Full Name</div>
                  <div className="w-3/4 text-gray-600">{user?.name || "John Doe"}</div>
                </div>
                <hr />
                <div className="flex mb-2">
                  <div className="w-1/4 text-gray-800">Email</div>
                  <div className="w-3/4 text-gray-600">{user?.email}</div>
                </div>
                <hr />
                <div className="flex mb-2">
                  <div className="w-1/4 text-gray-800">Phone</div>
                  <div className="w-3/4 text-gray-600">(097) 234-5678</div>
                </div>
                <hr />
                <div className="flex mb-2">
                  <div className="w-1/4 text-gray-800">Mobile</div>
                  <div className="w-3/4 text-gray-600">(098) 765-4321</div>
                </div>
                <hr />
                <div className="flex mb-2">
                  <div className="w-1/4 text-gray-800">Address</div>
                  <div className="w-3/4 text-gray-600">Bay Area, San Francisco, CA</div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 mb-4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-blue-600 font-italic mb-2">Assignments Status</p>
                    <p className="text-sm mb-1 text-gray-700">Create Profile</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Set Domains</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "66%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Connect Ads</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Create Links</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "89%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Integrate Lucia SDK</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "55%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 mb-4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-blue-600 font-italic mb-2">Assignments Status</p>
                    <p className="text-sm mb-1 text-gray-700">Create Profile</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Set Domains</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "66%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Connect Ads</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Create Links</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "89%" }}></div>
                    </div>
                    <p className="text-sm mb-1 text-gray-700">Integrate Lucia SDK</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "55%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProfileContainer>
  );
};
