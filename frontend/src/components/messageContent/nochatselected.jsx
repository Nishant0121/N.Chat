export default function HomePage({ user }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="text-4xl font-bold mb-4">Welcome, {user.fullname}!</div>
      <div className="text-2xl mb-6">
        {"We're"} glad to have you here. Explore your recent chats and stay
        connected with your friends.
      </div>
    </div>
  );
}
