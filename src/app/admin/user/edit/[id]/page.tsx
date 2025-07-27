"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUser, updateUser } from "@/store/actions/users";
import { UserForm } from "../../create/page";
import { useSession } from "next-auth/react";

const EditUserPage: React.FC = (props: any) => {
  const { fetchUser, updateUser } = props;
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const response = await fetchUser(String(params.id));

          if (response.payload?.data) {
            setInitialValues(response.payload.data);
          }
        } catch (error) {
          console.error("Failed to load user:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUser();
  }, [params.id, fetchUser, session?.accessToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user...</p>
        </div>
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">User not found</p>
          <button
            onClick={() => router.push("/admin/user/list")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserForm
      mode="edit"
      initialValues={initialValues}
      onSuccess={() => router.push("/admin/user/list")}
      userId={Number(params.id)}
      updateUser={updateUser}
    />
  );
};

const mapDispatchToProps = {
  fetchUser: fetchUser,
  updateUser: updateUser,
};

export default connect(null, mapDispatchToProps)(EditUserPage);
